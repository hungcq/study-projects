package raijin.librarymanagementsystem.boundaries.activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;


import raijin.librarymanagementsystem.Constants;
import raijin.librarymanagementsystem.controllers.LoginController;
import raijin.librarymanagementsystem.entities.LoginResult;
import raijin.librarymanagementsystem.utils.Utils;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SplashActivity extends AppCompatActivity {

    private SharedPreferences loginPref;
    private LoginController loginController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loginController = new LoginController();
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();

        StrictMode.setThreadPolicy(policy);
        checkLoginStatus();
    }

    private void checkLoginStatus() {
        loginPref = getSharedPreferences("login", MODE_PRIVATE);
        String username = loginPref.getString("username", null);
        String password = loginPref.getString("password", null);
        if (username != null && password != null) {
            LoginResult loginResult = loginController.login(username, password);
            if (loginResult.getStatus() == true) {
                Utils.username = username;
                Utils.role = loginResult.getRole();
                switch (loginResult.getRole()) {
                    case Constants.CUSTOMER:
                        startActivity(new Intent(SplashActivity.this, BorrowerActivity.class));
                        break;
                    case Constants.LIBRARIAN:
                        startActivity(new Intent(SplashActivity.this, LibrarianActivity.class));
                        break;
                    default:
                        break;
                }
            } else {
                startActivity(new Intent(SplashActivity.this, LoginActivity.class));
            }
            finish();
        } else {
            startActivity(new Intent(SplashActivity.this, LoginActivity.class));
            finish();
        }
    }
}
