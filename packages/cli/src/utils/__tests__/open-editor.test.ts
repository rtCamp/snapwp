import { openEditor } from '../open-editor';
import { spawn } from 'child_process';
import path from 'path';

// Mock 'child_process'
jest.mock('child_process', () => ({
  ...jest.requireActual('child_process'),
  spawn: jest.fn(),
}));

describe('openEditor', () => {
  const mockFilePath = 'test-file.txt';
  const resolvedMockFilePath = path.resolve(mockFilePath);
  let mockSpawnInstance: { on: jest.Mock; };
  const originalEnv = { ...process.env }; // Store original environment variables

  beforeEach(() => {
    // Reset environment variables to original state before each test
    process.env = { ...originalEnv };
    
    // Clear mocks
    (spawn as jest.Mock).mockClear();

    // Setup a mock spawn instance for each test
    mockSpawnInstance = {
      on: jest.fn((event, callback) => {
        if (event === 'exit') {
          // Simulate successful exit by default
          callback(); 
        }
        return mockSpawnInstance; // Return for chaining, if any
      }),
      // Add other properties like stdin, stdout, stderr if they are used by the code
    };
    (spawn as jest.Mock).mockReturnValue(mockSpawnInstance as any);
  });

  afterAll(() => {
    // Restore original environment variables after all tests
    process.env = { ...originalEnv };
  });

  it('should use VISUAL environment variable if set', async () => {
    process.env.VISUAL = 'code';
    await openEditor(mockFilePath);
    expect(spawn).toHaveBeenCalledWith('code', [mockFilePath], { stdio: 'inherit' });
  });

  it('should use EDITOR environment variable if VISUAL is not set', async () => {
    delete process.env.VISUAL; // Ensure VISUAL is not set
    process.env.EDITOR = 'nano';
    await openEditor(mockFilePath);
    expect(spawn).toHaveBeenCalledWith('nano', [mockFilePath], { stdio: 'inherit' });
  });

  it('should default to "vi" if neither VISUAL nor EDITOR are set', async () => {
    delete process.env.VISUAL;
    delete process.env.EDITOR;
    await openEditor(mockFilePath);
    expect(spawn).toHaveBeenCalledWith('vi', [mockFilePath], { stdio: 'inherit' });
  });

  it('should resolve with success true and correct message on successful editor exit', async () => {
    const result = await openEditor(mockFilePath);
    expect(result.success).toBe(true);
    expect(result.message).toBe(`\nFile created at "${resolvedMockFilePath}"`);
    expect(mockSpawnInstance.on).toHaveBeenCalledWith('exit', expect.any(Function));
  });

  it('should resolve with success false and error message if spawn throws an error', async () => {
    const errorMessage = 'Spawn failed';
    (spawn as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const result = await openEditor(mockFilePath);
    expect(result.success).toBe(false);
    expect(result.message).toBe(`\nError: ${errorMessage}`);
  });
  
  it('should resolve with success false and generic message for non-Error instance', async () => {
    (spawn as jest.Mock).mockImplementation(() => {
      // eslint-disable-next-line no-throw-literal
      throw 'Unknown problem';
    });
    const result = await openEditor(mockFilePath);
    expect(result.success).toBe(false);
    expect(result.message).toBe('\nAn unknown error occurred.');
  });

  it('should correctly pass filePath to the editor', async () => {
    const customFilePath = 'src/my-file.js';
    await openEditor(customFilePath);
    expect(spawn).toHaveBeenCalledWith(expect.any(String), [customFilePath], { stdio: 'inherit' });
  });
});
