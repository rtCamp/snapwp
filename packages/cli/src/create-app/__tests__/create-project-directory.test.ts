import { createProjectDirectory } from '../create-project-directory';
import fs from 'fs';
import path from 'path';

// Mock the 'fs' module
jest.mock('fs');
// Mock 'ora' as it's used for spinners, not essential for core logic testing
jest.mock('ora', () => {
  const mockOra = {
    start: jest.fn().mockReturnThis(),
    succeed: jest.fn().mockReturnThis(),
    fail: jest.fn().mockReturnThis(),
    stop: jest.fn().mockReturnThis(),
  };
  return jest.fn(() => mockOra);
});


describe('createProjectDirectory', () => {
  const mockProjectName = 'test-project';
  const mockProjectPath = path.join(process.cwd(), mockProjectName);

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (fs.existsSync as jest.Mock).mockClear();
    (fs.mkdirSync as jest.Mock).mockClear();
  });

  it('should create a directory if it does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    (fs.mkdirSync as jest.Mock).mockReturnValue(undefined); // or path, depending on actual usage

    createProjectDirectory(mockProjectName);

    expect(fs.existsSync).toHaveBeenCalledWith(mockProjectPath);
    expect(fs.mkdirSync).toHaveBeenCalledWith(mockProjectPath);
  });

  it('should throw an error if the directory already exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);

    // We need to wrap the function call in a lambda for Jest to catch the throw
    expect(() => createProjectDirectory(mockProjectName)).toThrow(
      `Directory "${mockProjectName}" already exists. Please use a different name or remove the existing directory.`
    );
    expect(fs.existsSync).toHaveBeenCalledWith(mockProjectPath);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });

  it('should throw an error if mkdirSync fails for other reasons', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    const mkdirError = new Error('Something went wrong');
    (fs.mkdirSync as jest.Mock).mockImplementation(() => {
      throw mkdirError;
    });

    expect(() => createProjectDirectory(mockProjectName)).toThrow(
      `Could not create directory "${mockProjectName}". Error: ${mkdirError.message}`
    );
    expect(fs.existsSync).toHaveBeenCalledWith(mockProjectPath);
    expect(fs.mkdirSync).toHaveBeenCalledWith(mockProjectPath);
  });
});
