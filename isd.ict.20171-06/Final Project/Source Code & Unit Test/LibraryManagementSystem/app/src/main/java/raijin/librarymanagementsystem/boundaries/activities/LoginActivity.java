package raijin.librarymanagementsystem.boundaries.activities;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.StrictMode;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import raijin.librarymanagementsystem.Constants;
import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.controllers.LoginController;
import raijin.librarymanagementsystem.entities.LoginResult;
import raijin.librarymanagementsystem.utils.Utils;

public class LoginActivity extends AppCompatActivity implements View.OnClickListener {

    private EditText userNameEditText;
    private EditText passwordEditText;
    private Button loginButton;
    private Button registerButton;
    private Button guessButton;
    private SharedPreferences loginPref;
    private LoginController loginController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        setContentView(R.layout.activity_login);
        init();
    }

    private void init() {
        loginPref = getSharedPreferences("login", MODE_PRIVATE);
        userNameEditText = findViewById(R.id.usernameEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        loginButton = findViewById(R.id.loginButton);
        registerButton = findViewById(R.id.registerButton);
        guessButton = findViewById(R.id.guessButton);
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
        loginButton.setOnClickListener(this);
        registerButton.setOnClickListener(this);
        guessButton.setOnClickListener(this);
        loginController = new LoginController();
        userNameEditText.setText(getIntent().getStringExtra("username"));
        passwordEditText.setText(getIntent().getStringExtra("password"));
    }

    private void login() {
        String username = userNameEditText.getText().toString();
        String password = passwordEditText.getText().toString();
        if (username.equals("") || password.equals("")) {
            showSnackbar("Please enter Username and Password.");
        } else {
            LoginResult loginResult = loginController.login(username, password);
            if (loginResult.getStatus() == true) {
                Utils.username = username;
                Utils.role = loginResult.getRole();
                loginPref.edit()
                        .putString("username", userNameEditText.getText().toString())
                        .putString("password", passwordEditText.getText().toString())
                        .apply();
                switch (loginResult.getRole()) {
                    case Constants.CUSTOMER:
                        startActivity(new Intent(LoginActivity.this, BorrowerActivity.class));
                        break;
                    case Constants.LIBRARIAN:
                        startActivity(new Intent(LoginActivity.this, LibrarianActivity.class));
                        break;
                    default:
                        break;
                }
                finish();
            } else {
                showSnackbar("Username or Password is incorrect.");
            }
        }
    }

    private void showSnackbar(String content) {
        Snackbar.make(findViewById(R.id.coordinator_layout), content, Snackbar.LENGTH_SHORT).show();
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.loginButton:
                login();
                break;
            case R.id.registerButton:
                startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
                break;
            case R.id.guessButton:
                break;
            default:
                break;
        }
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        View view = getCurrentFocus();
        if (view != null && (ev.getAction() == MotionEvent.ACTION_UP || ev.getAction() == MotionEvent.ACTION_MOVE) && view instanceof EditText && !view.getClass().getName().startsWith("android.webkit.")) {
            int scrcoords[] = new int[2];
            view.getLocationOnScreen(scrcoords);
            float x = ev.getRawX() + view.getLeft() - scrcoords[0];
            float y = ev.getRawY() + view.getTop() - scrcoords[1];
            if (x < view.getLeft() || x > view.getRight() || y < view.getTop() || y > view.getBottom())
                ((InputMethodManager)this.getSystemService(Context.INPUT_METHOD_SERVICE)).hideSoftInputFromWindow((this.getWindow().getDecorView().getApplicationWindowToken()), 0);
        }
        return super.dispatchTouchEvent(ev);
    }
}