import { printSuccessMessage } from '../print-success-message';

// Mock console.log
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('printSuccessMessage', () => {
  const mockProjectName = 'my-awesome-app';

  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  it('should print the correct success message to the console', () => {
    printSuccessMessage(mockProjectName);

    // Check that console.log was called
    expect(mockConsoleLog).toHaveBeenCalled();

    // Check the content of the message (can check parts or the whole thing)
    // For a more robust test, you might want to check individual calls if there are multiple
    const firstCall = mockConsoleLog.mock.calls[0][0]; // Get the first argument of the first call
    expect(firstCall).toContain(`🎉 Your new SnapWP project "${mockProjectName}" has been created successfully!`);
    expect(firstCall).toContain(`To get started, run the following commands:`);
    expect(firstCall).toContain(`cd ${mockProjectName}`);
    expect(firstCall).toContain(`npm run dev`);
  });

  it('should include the project name in the message', () => {
    printSuccessMessage(mockProjectName);
    const message = mockConsoleLog.mock.calls[0][0];
    expect(message).toMatch(new RegExp(mockProjectName));
  });
});
