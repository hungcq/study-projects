package raijin.librarymanagementsystem.boundaries.fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.controllers.AddCopyController;
import raijin.librarymanagementsystem.controllers.CheckResult;
import raijin.librarymanagementsystem.entities.PostResult;

/**
 * A simple {@link Fragment} subclass.
 */
public class AddCopyFragment extends BaseFragment implements View.OnClickListener {

    private EditText bookNumberEditText;
    private EditText typeEditText;
    private EditText priceEditText;
    private Button submitButton;
    private AddCopyController addCopyController;

    public AddCopyFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_add_copy, container, false);
        bookNumberEditText = view.findViewById(R.id.bookNumberEditText);
        typeEditText = view.findViewById(R.id.typeEditText);
        priceEditText = view.findViewById(R.id.priceEditText);
        submitButton = view.findViewById(R.id.submitButton);
        submitButton.setOnClickListener(this);

        addCopyController = new AddCopyController();
        return view;
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
        String bookNumber = bookNumberEditText.getText().toString();
        String type = typeEditText.getText().toString();
        String price = priceEditText.getText().toString();
        CheckResult checkResult = addCopyController.checkForm(bookNumber, type, price);
        if(!checkResult.isValid()) {
            showSnackbar(checkResult.getErrorMessage());
        } else {
            PostResult postResult = addCopyController.addCopy(bookNumber, type, price);
            if (postResult.getStatus() == true) {
                showSnackbar("Copy successfully added.");
                openFragment(new ManageCopyFragment());
            } else {
                showSnackbar(postResult.getError());
            }
        }
    }
}
