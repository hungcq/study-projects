package raijin.librarymanagementsystem.controllers;

/**
 * Created by Huy Nguyen on 19-Nov-17.
 */

public class CheckResult {
    private boolean valid;
    private String errorMessage;

    public CheckResult(boolean valid, String errorMessage) {
        this.valid = valid;
        this.errorMessage = errorMessage;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
