package raijin.librarymanagementsystem.boundaries.activities;

import android.content.Context;
import android.content.Intent;
import android.os.StrictMode;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Switch;

import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.controllers.CheckResult;
import raijin.librarymanagementsystem.controllers.RegisterController;
import raijin.librarymanagementsystem.entities.PostResult;

public class RegisterActivity extends AppCompatActivity implements View.OnClickListener, CompoundButton.OnCheckedChangeListener {

    private EditText usernameEditText;
    private EditText passwordEditText;
    private EditText nameEditText;
    private EditText emailEditText;
    private EditText genderEditText;
    private EditText contactEditText;
    private Button submitButton;
    private Switch switchButton;
    private EditText studentIdEditText;
    private EditText periodEditText;

    private RegisterController registerController;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        setContentView(R.layout.activity_register);
        usernameEditText = findViewById(R.id.usernameEditText);
        passwordEditText = findViewById(R.id.passwordEditText);
        nameEditText = findViewById(R.id.nameEditText);
        emailEditText = findViewById(R.id.emailEditText);
        genderEditText = findViewById(R.id.genderEditText);
        contactEditText = findViewById(R.id.contactEditText);
        submitButton = findViewById(R.id.submitButton);
        submitButton.setOnClickListener(this);
        switchButton = findViewById(R.id.switchButton);
        switchButton.setOnCheckedChangeListener(this);
        studentIdEditText = findViewById(R.id.studentIdEditText);
        periodEditText = findViewById(R.id.periodEditText);

        registerController = new RegisterController();
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.submitButton:
                sendForm();
                break;
        }
    }

    private void sendForm() {
        String username = usernameEditText.getText().toString();
        String password = passwordEditText.getText().toString();
        String name = nameEditText.getText().toString();
        String email = emailEditText.getText().toString();
        String gender = genderEditText.getText().toString();
        String contact = contactEditText.getText().toString();
        String studentId = studentIdEditText.getText().toString();
        String period = periodEditText.getText().toString();
        CheckResult checkResult = registerController.checkForm(username, password, name, email, gender, contact, studentId, period, switchButton.isChecked());
        if (!checkResult.isValid()) {
            showSnackbar(checkResult.getErrorMessage());
        } else {
            PostResult postResult;
            if (switchButton.isChecked()) {
                postResult = registerController.registerHustAccount(username, password, name, email, gender, contact, studentId, period);
            } else {
                postResult = registerController.registerAccount(username, password, name, email, gender, contact);
            }
            if (postResult.getStatus() == true) {
                Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                intent.putExtra("username", username);
                intent.putExtra("password", password);
                startActivity(intent);
                finish();
            } else {
//                        showSnackbar("Someone already has that username.");
                showSnackbar(postResult.getError());
            }
        }
    }

    private void showSnackbar(String content) {
        Snackbar.make(findViewById(R.id.coordinator_layout), content, Snackbar.LENGTH_SHORT).show();
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

    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
            studentIdEditText.setEnabled(true);
            periodEditText.setEnabled(true);
        } else {
            studentIdEditText.setEnabled(false);
            periodEditText.setEnabled(false);
            studentIdEditText.setText("");
            periodEditText.setText("");
        }
    }
}
