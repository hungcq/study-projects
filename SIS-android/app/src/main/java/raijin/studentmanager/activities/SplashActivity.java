package raijin.studentmanager.activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import raijin.studentmanager.Constants;
import raijin.studentmanager.Utils;
import raijin.studentmanager.models.auth.Authorization;
import raijin.studentmanager.models.auth.User;
import raijin.studentmanager.webservices.LoginAPI;
import raijin.studentmanager.webservices.LoginServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SplashActivity extends AppCompatActivity {

    private SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        sharedPreferences = getSharedPreferences("login", MODE_PRIVATE);
        checkLoginStatus();
    }

    private void checkLoginStatus() {
        String username = sharedPreferences.getString("username", null);
        String password = sharedPreferences.getString("password", null);
        if (username != null && password != null) {
            LoginAPI loginAPI = LoginServiceFactory.getInst().createService(LoginAPI.class);
            loginAPI.callAuthorization(new User(username, password))
                    .enqueue(new Callback<Authorization>() {
                        @Override
                        public void onResponse(Call<Authorization> call, Response<Authorization> response) {
                            if (response.isSuccessful()) {
                                Utils.AUTHORIZATION_TOKEN = "JWT " + response.body().getToken();
                                String group = response.body().getGroup();
                                if (group.equals(Constants.GROUP_STUDENT)) {
                                    startActivity(new Intent(SplashActivity.this, StudentActivity.class));
                                } else if (group.equals(Constants.GROUP_ADMIN)) {
                                    startActivity(new Intent(SplashActivity.this, ManagerActivity.class));
                                } else if (group.equals(Constants.GROUP_LECTURER)) {
                                    startActivity(new Intent(SplashActivity.this, LecturerActivity.class));
                                } else {
                                    startActivity(new Intent(SplashActivity.this, ManagerActivity.class));
                                }
                                finish();
                            } else {
                                startActivity(new Intent(SplashActivity.this, LoginActivity.class));
                                finish();
                            }
                        }

                        @Override
                        public void onFailure(Call<Authorization> call, Throwable t) {
                            startActivity(new Intent(SplashActivity.this, LoginActivity.class));
                        }
                    });
        } else {
            startActivity(new Intent(SplashActivity.this, LoginActivity.class));
            finish();
        }
    }
}
