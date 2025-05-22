import { setupNpmrc } from '../setup-npmrc';
import fs from 'fs';
import path from 'path';

// Mock 'fs'
jest.mock('fs');
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

describe('setupNpmrc', () => {
  const mockProjectName = 'test-npmrc-project';
  const mockProjectPath = path.join(process.cwd(), mockProjectName);
  const npmrcFilePath = path.join(mockProjectPath, '.npmrc');
  const originalFontAwesomeToken = process.env.FONTAWESOME_NPM_AUTH_TOKEN;

  beforeEach(() => {
    (fs.writeFileSync as jest.Mock).mockClear();
    // Reset the env variable before each test
    if (originalFontAwesomeToken !== undefined) {
      process.env.FONTAWESOME_NPM_AUTH_TOKEN = originalFontAwesomeToken;
    } else {
      delete process.env.FONTAWESOME_NPM_AUTH_TOKEN;
    }
  });

  afterAll(() => {
    // Restore the original env variable
    if (originalFontAwesomeToken !== undefined) {
      process.env.FONTAWESOME_NPM_AUTH_TOKEN = originalFontAwesomeToken;
    } else {
      delete process.env.FONTAWESOME_NPM_AUTH_TOKEN;
    }
  });

  it('should create .npmrc with Font Awesome config if token is present', () => {
    const mockToken = 'test-token';
    process.env.FONTAWESOME_NPM_AUTH_TOKEN = mockToken;

    setupNpmrc(mockProjectName);

    const expectedContent = `@fortawesome:registry=https://npm.fontawesome.com/\n//npm.fontawesome.com/:_authToken=${mockToken}\n`;
    expect(fs.writeFileSync).toHaveBeenCalledWith(npmrcFilePath, expectedContent);
  });

  it('should create an empty .npmrc file if Font Awesome token is NOT present', () => {
    delete process.env.FONTAWESOME_NPM_AUTH_TOKEN;

    setupNpmrc(mockProjectName);

    // Based on the current implementation of setup-npmrc.ts, if the token is missing,
    // it writes an empty string to .npmrc.
    expect(fs.writeFileSync).toHaveBeenCalledWith(npmrcFilePath, '');
  });

  it('should throw an error if writing .npmrc fails', () => {
    const mockToken = 'test-token';
    process.env.FONTAWESOME_NPM_AUTH_TOKEN = mockToken;
    const writeError = new Error('Failed to write .npmrc');
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {
      throw writeError;
    });

    expect(() => setupNpmrc(mockProjectName)).toThrow(
      `Could not create .npmrc file in "${mockProjectName}". Error: ${writeError.message}`
    );
    const expectedContent = `@fortawesome:registry=https://npm.fontawesome.com/\n//npm.fontawesome.com/:_authToken=${mockToken}\n`;
    expect(fs.writeFileSync).toHaveBeenCalledWith(npmrcFilePath, expectedContent);
  });
});
