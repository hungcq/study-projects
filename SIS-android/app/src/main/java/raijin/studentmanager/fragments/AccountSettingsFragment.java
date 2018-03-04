package raijin.studentmanager.fragments;


import android.os.Bundle;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import com.pnikosis.materialishprogress.ProgressWheel;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.interfaces.UserInfoListener;
import raijin.studentmanager.models.userinfo.UserInfo;
import raijin.studentmanager.webservices.ServiceFactory;
import raijin.studentmanager.webservices.UserAPI;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class AccountSettingsFragment extends Fragment implements View.OnClickListener {

    private CoordinatorLayout coordinatorLayout;
    private ProgressWheel progressWheel;
    private EditText userNameEditText;
    private EditText firstNameEditText;
    private EditText lastNameEditText;
    private EditText emailEditText;
    private EditText passwordEditText;
    private Button saveButton;
    private UserInfo userInfo;

    public AccountSettingsFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        getActivity().setTitle(R.string.account_settings);
        View view = inflater.inflate(R.layout.fragment_account_settings, container, false);
        init(view);
        return view;
    }

    private void init(View view) {
        coordinatorLayout = (CoordinatorLayout) view.findViewById(R.id.coordinator_layout);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        userNameEditText = (EditText) view.findViewById(R.id.et_username);
        firstNameEditText = (EditText) view.findViewById(R.id.et_firstname);
        lastNameEditText = (EditText) view.findViewById(R.id.et_lastname);
        emailEditText = (EditText) view.findViewById(R.id.et_email);
        passwordEditText = (EditText) view.findViewById(R.id.et_password);
        saveButton = (Button) view.findViewById(R.id.btn_save);
        saveButton.setOnClickListener(this);
        ServiceFactory.getInst().createService(UserAPI.class).callUserInfo(Constants.JSON_FORMAT)
                .enqueue(new Callback<UserInfo>() {
                    @Override
                    public void onResponse(Call<UserInfo> call, Response<UserInfo> response) {
                        if (response.isSuccessful()) {
                            userInfo = response.body();
                            userNameEditText.setText(userInfo.getUsername());
                            firstNameEditText.setText(userInfo.getFirstName());
                            lastNameEditText.setText(userInfo.getLastName());
                            emailEditText.setText(userInfo.getEmail());
                            progressWheel.stopSpinning();
                        }
                    }

                    @Override
                    public void onFailure(Call<UserInfo> call, Throwable t) {
                        showSnackbar(R.string.load_userinfo_fail);
                    }
                });
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn_save:
                if (userInfo != null) {
                    String password = null;
                    if (passwordEditText.getText().toString().equals("")) {
                        password = null;
                    } else password = passwordEditText.getText().toString();
                    ServiceFactory.getInst().createService(UserAPI.class)
                            .updateUserInfo(userInfo.getId(), new UserInfo(password, userInfo.getUsername(),
                                    firstNameEditText.getText().toString(), lastNameEditText.getText().toString(), emailEditText.getText().toString()))
                            .enqueue(new Callback<UserInfo>() {
                                @Override
                                public void onResponse(Call<UserInfo> call, Response<UserInfo> response) {
                                    if (response.isSuccessful()) {
                                        showSnackbar(R.string.userinfo_updated);
                                    } else showSnackbar(R.string.userinfo_update_fail);
                                    ((UserInfoListener) getActivity()).onInfoChanged();
                                }

                                @Override
                                public void onFailure(Call<UserInfo> call, Throwable t) {
                                    showSnackbar(R.string.userinfo_update_fail);
                                }
                            });
                    break;
                }
        }
    }

    public void showSnackbar(int stringID) {
        Snackbar.make(coordinatorLayout, stringID, Snackbar.LENGTH_SHORT).show();
    }
}
