package raijin.studentmanager.activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.pnikosis.materialishprogress.ProgressWheel;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.Utils;
import raijin.studentmanager.models.auth.Authorization;
import raijin.studentmanager.models.auth.User;
import raijin.studentmanager.webservices.LoginAPI;
import raijin.studentmanager.webservices.LoginServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText userNameEditText;
    private EditText passwordEditText;
    private Button loginButton;
    private ProgressWheel progressWheel;
    private SharedPreferences sharedPreferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        init();
    }

    private void init() {
        sharedPreferences = getSharedPreferences("login", MODE_PRIVATE);
        userNameEditText = (EditText) findViewById(R.id.et_username);
        passwordEditText = (EditText) findViewById(R.id.et_password);
        progressWheel = (ProgressWheel) findViewById(R.id.progress_wheel);
        passwordEditText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    login();
                    return true;
                }
                return false;
            }
        });
        loginButton = (Button) findViewById(R.id.btn_login);
        loginButton.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_login:
                login();
                break;
            default:
                break;
        }
    }

    private void login() {
        if (userNameEditText.getText().toString().equals("") || passwordEditText.getText().toString().equals("")) {
            Snackbar.make(findViewById(R.id.coordinator_layout), R.string.fill_login,
                    Snackbar.LENGTH_SHORT)
                    .show();
        } else {
            LoginAPI loginAPI = LoginServiceFactory.getInst().createService(LoginAPI.class);
            progressWheel.spin();
            loginAPI.callAuthorization(new User(userNameEditText.getText().toString(), passwordEditText.getText().toString()))
                    .enqueue(new Callback<Authorization>() {
                        @Override
                        public void onResponse(Call<Authorization> call, Response<Authorization> response) {
                            progressWheel.stopSpinning();
                            if (response.isSuccessful()) {
                                Utils.AUTHORIZATION_TOKEN = "JWT " + response.body().getToken();
                                sharedPreferences.edit()
                                        .putString("username", userNameEditText.getText().toString())
                                        .putString("password", passwordEditText.getText().toString()).apply();
                                String group = response.body().getGroup();
                                if (group.equals(Constants.GROUP_STUDENT)) {
                                    startActivity(new Intent(LoginActivity.this, StudentActivity.class));
                                } else if (group.equals(Constants.GROUP_ADMIN)) {
                                    startActivity(new Intent(LoginActivity.this, ManagerActivity.class));
                                } else if (group.equals(Constants.GROUP_LECTURER)) {
                                    startActivity(new Intent(LoginActivity.this, LecturerActivity.class));
                                } else {
                                    startActivity(new Intent(LoginActivity.this, ManagerActivity.class));
                                }
                                finish();
                            } else {
                                Snackbar.make(findViewById(R.id.coordinator_layout), R.string.failed_login,
                                        Snackbar.LENGTH_SHORT)
                                        .show();
                            }
                        }

                        @Override
                        public void onFailure(Call<Authorization> call, Throwable t) {
                            progressWheel.stopSpinning();
                            Snackbar.make(findViewById(R.id.coordinator_layout), R.string.no_connection,
                                    Snackbar.LENGTH_LONG)
                                    .show();
                        }
                    });
        }
    }
}
