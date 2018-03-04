package raijin.librarymanagementsystem.boundaries.fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.controllers.AddBookController;
import raijin.librarymanagementsystem.controllers.CheckResult;
import raijin.librarymanagementsystem.entities.PostResult;

/**
 * A simple {@link Fragment} subclass.
 */
public class AddBookFragment extends BaseFragment implements View.OnClickListener {

    private EditText titleEditText;
    private EditText authorEditText;
    private EditText publisherEditText;
    private EditText isbnEditText;
    private EditText classificationEditText;
    private EditText typeEditText;
    private EditText priceEditText;
    private Button submitButton;

    private AddBookController addBookController;

    public AddBookFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_add_book, container, false);
        titleEditText = view.findViewById(R.id.titleEditText);
        authorEditText = view.findViewById(R.id.authorEditText);
        publisherEditText = view.findViewById(R.id.publisherEditText);
        isbnEditText = view.findViewById(R.id.isbnEditText);
        classificationEditText = view.findViewById(R.id.classificationEditText);
        typeEditText = view.findViewById(R.id.typeEditText);
        priceEditText = view.findViewById(R.id.priceEditText);
        submitButton = view.findViewById(R.id.submitButton);
        submitButton.setOnClickListener(this);

        addBookController = new AddBookController();
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
        String title = titleEditText.getText().toString();
        String author = authorEditText.getText().toString();
        String publisher = publisherEditText.getText().toString();
        String isbn = isbnEditText.getText().toString();
        String classification = classificationEditText.getText().toString();
        String type = typeEditText.getText().toString();
        String price = priceEditText.getText().toString();
        CheckResult checkResult = addBookController.checkForm(title, author, publisher, isbn, classification, type, price);
        if (!checkResult.isValid()) {
            showSnackbar(checkResult.getErrorMessage());
        } else {
            PostResult postResult = addBookController.addBook(title, author, publisher, isbn, classification, type, price);
            if (postResult.getStatus() == true) {
                showSnackbar("Book successfully added.");
                openFragment(new ManageBookFragment());
            } else {
                showSnackbar(postResult.getError());
            }
        }
    }
}
