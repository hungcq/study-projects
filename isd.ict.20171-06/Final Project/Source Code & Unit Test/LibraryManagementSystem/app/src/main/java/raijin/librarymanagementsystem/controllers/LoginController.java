package raijin.librarymanagementsystem.controllers;

import raijin.librarymanagementsystem.entities.LoginResult;
import raijin.librarymanagementsystem.entities.Account;
import raijin.librarymanagementsystem.entities.webservices.DataHandler;

/**
 * Created by 1918 on 19-Nov-17.
 */

public class LoginController {

    public LoginController() {
    }

    public LoginResult login(String username, String password) {
        Account user = new Account(username, password);
        return DataHandler.requestLogin(user);
    }
}
