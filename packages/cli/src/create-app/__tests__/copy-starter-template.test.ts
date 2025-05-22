import { copyStarterTemplate } from '../copy-starter-template';
import fsExtra from 'fs-extra';
import path from 'path';

// Mock 'fs-extra'
jest.mock('fs-extra');
// Mock 'ora'
jest.mock('ora', () => {
  const mockOra = {
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
  };
  return jest.fn(() => mockOra);
});

describe('copyStarterTemplate', () => {
  const mockProjectName = 'test-project';
  const mockProjectPath = path.join(process.cwd(), mockProjectName);
  // Construct the expected source path based on the structure in copy-starter-template.ts
  // The actual `STARTER_TEMPLATE_PATH` is path.resolve(__dirname, '../../../../starters/default')
  // We need to mock this path or ensure our mock for copySync handles it.
  // For simplicity, we'll define a mock source path and ensure copySync is called with it.
  const mockStarterTemplatePath = path.resolve(__dirname, '../../../../starters/default');


  beforeEach(() => {
    (fsExtra.copySync as jest.Mock).mockClear();
  });

  it('should copy the starter template to the project path', () => {
    copyStarterTemplate(mockProjectName);

    expect(fsExtra.copySync).toHaveBeenCalledTimes(1);
    expect(fsExtra.copySync).toHaveBeenCalledWith(
      mockStarterTemplatePath,
      mockProjectPath,
      { overwrite: true }
    );
  });

  it('should throw an error if copying fails', () => {
    const copyError = new Error('Failed to copy');
    (fsExtra.copySync as jest.Mock).mockImplementation(() => {
      throw copyError;
    });

    expect(() => copyStarterTemplate(mockProjectName)).toThrow(
      `Could not copy starter template. Error: ${copyError.message}`
    );
    expect(fsExtra.copySync).toHaveBeenCalledTimes(1);
  });
});
