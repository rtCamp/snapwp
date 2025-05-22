// Mock external dependencies and local modules at the top
jest.mock('commander', () => {
  const mockCommander = {
    option: jest.fn().mockReturnThis(),
    parse: jest.fn().mockReturnThis(),
    opts: jest.fn().mockReturnValue({}), // Default: no options
  };
  return { program: mockCommander };
});

jest.mock('../create-app/copy-starter-template');
jest.mock('../create-app/create-project-directory');
jest.mock('../create-app/print-success-message');
jest.mock('../create-app/run-npm-install');
jest.mock('../create-app/setup-env-file');
jest.mock('../create-app/setup-npmrc');
jest.mock('../create-app/update-package-versions');
jest.mock('../utils/prompt');

// Mock path and process
jest.mock('path', () => ({
  ...jest.requireActual('path'), // Keep original path functions
  resolve: jest.fn((...args) => args.join('/')), // Simple mock for resolve
}));
const mockProcessExit = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});


// Import the functions/modules to be tested after mocks are set up
import { program } from 'commander';
import { copyStarterTemplate } from '../create-app/copy-starter-template';
import { createProjectDirectory } from '../create-app/create-project-directory';
import { printSuccessMessage } from '../create-app/print-success-message';
import { runNpmInstall } from '../create-app/run-npm-install';
import { setupEnvFile } from '../create-app/setup-env-file';
import { setupNpmrc } from '../create-app/setup-npmrc';
import { updatePackageVersions } from '../create-app/update-package-versions';
import { prompt } from '../utils/prompt';


const DEFAULT_PROJECT_PATH_FROM_SNAPWP_TS = './snapwp-app';

describe('snapwp main execution', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    // Default behavior for opts
    (program.opts as jest.Mock).mockReturnValue({});
    // Default behavior for prompt
    (prompt as jest.Mock).mockResolvedValue('test-project');
    // Default behavior for path.resolve
    (require('path').resolve as jest.Mock).mockImplementation((dir: string) => `/resolved/${dir}`);

  });

  const runSnapwp = async () => {
    // Dynamically import snapwp.ts to execute its top-level async IIFE
    // This needs to be relative to the test file's location or properly configured in jest.config.js
    // For simplicity, we'll assume the test runner can find it or adjust if needed.
    // Await its execution by requiring it and letting the IIFE run.
    // We need a way to re-trigger this IIFE for each test.
    // The most straightforward way is to put the content of snapwp.ts into a function
    // and export it, or use jest.isolateModules.
    await jest.isolateModulesAsync(async () => {
      require('../snapwp');
    });
  };

  it('should run the full project creation flow successfully', async () => {
    await runSnapwp();

    expect(prompt).toHaveBeenCalledWith(
      expect.stringContaining('Where would you like to create your new Headless WordPress frontend?'),
      DEFAULT_PROJECT_PATH_FROM_SNAPWP_TS
    );
    const resolvedTestProjectDir = '/resolved/test-project'; // Based on mock path.resolve

    expect(createProjectDirectory).toHaveBeenCalledWith(resolvedTestProjectDir);
    expect(setupEnvFile).toHaveBeenCalledWith(resolvedTestProjectDir, false); // false for useDefaultEnv
    expect(copyStarterTemplate).toHaveBeenCalledWith(resolvedTestProjectDir);
    expect(setupNpmrc).toHaveBeenCalledWith(resolvedTestProjectDir, undefined); // undefined for proxy option
    expect(updatePackageVersions).toHaveBeenCalledWith(resolvedTestProjectDir);
    expect(runNpmInstall).toHaveBeenCalledWith(resolvedTestProjectDir);
    expect(printSuccessMessage).toHaveBeenCalledWith(resolvedTestProjectDir, false, false); // useDefaultEnv, needsManualInstall
    expect(mockProcessExit).not.toHaveBeenCalled();
  });

  it('should use default project path if prompt returns it', async () => {
    (prompt as jest.Mock).mockResolvedValue(DEFAULT_PROJECT_PATH_FROM_SNAPWP_TS);
    (require('path').resolve as jest.Mock).mockImplementation((dir: string) => `/resolved/${dir}`);
    
    await runSnapwp();
    
    const resolvedDefaultPath = `/resolved/${DEFAULT_PROJECT_PATH_FROM_SNAPWP_TS}`;
    expect(createProjectDirectory).toHaveBeenCalledWith(resolvedDefaultPath);
    // ... other calls with resolvedDefaultPath
    expect(printSuccessMessage).toHaveBeenCalledWith(resolvedDefaultPath, false, false);
    expect(mockProcessExit).toHaveBeenCalledWith(1); // Exits with 1 if default path is used
  });
  
  it('should skip npm install if --skip-install flag is provided', async () => {
    (program.opts as jest.Mock).mockReturnValue({ skipInstall: true });
    await runSnapwp();

    expect(runNpmInstall).not.toHaveBeenCalled();
    expect(mockConsoleLog).toHaveBeenCalledWith('Skipping NPM dependencies installation...');
    expect(printSuccessMessage).toHaveBeenCalledWith(expect.any(String), false, true); // needsManualInstall = true
  });

  it('should pass proxy option to setupNpmrc if --proxy flag is provided', async () => {
    (program.opts as jest.Mock).mockReturnValue({ proxy: true });
    await runSnapwp();
    expect(setupNpmrc).toHaveBeenCalledWith(expect.any(String), true);
  });

  it('should set needsManualInstall to true if runNpmInstall throws an error', async () => {
    (runNpmInstall as jest.Mock).mockRejectedValue(new Error('NPM install failed'));
    await runSnapwp();

    expect(printSuccessMessage).toHaveBeenCalledWith(expect.any(String), false, true); // needsManualInstall = true
  });

  it('should handle errors during project creation and exit', async () => {
    const errorMessage = 'Directory creation failed';
    (createProjectDirectory as jest.Mock).mockRejectedValue(new Error(errorMessage));
    
    await runSnapwp();

    expect(mockConsoleError).toHaveBeenCalledWith('Error:', expect.objectContaining({ message: errorMessage }));
    expect(mockProcessExit).toHaveBeenCalledWith(1);
  });

  it('should call program.option and program.parse', async () => {
    await runSnapwp(); // program is accessed at module level
    expect(program.option).toHaveBeenCalledWith('--proxy', 'Use proxy registry.');
    expect(program.option).toHaveBeenCalledWith('--skip-install', 'Skip installing npm dependencies.');
    expect(program.parse).toHaveBeenCalled();
  });
});
