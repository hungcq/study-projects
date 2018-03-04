package raijin.librarymanagementsystem.boundaries.fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.List;

import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.boundaries.adapters.BookRvAdapter;
import raijin.librarymanagementsystem.controllers.BookController;
import raijin.librarymanagementsystem.controllers.BorrowBookController;
import raijin.librarymanagementsystem.entities.Book;

/**
 * A simple {@link Fragment} subclass.
 */
public class BorrowBookFragment extends BaseFragment implements TextWatcher {

    private RecyclerView recyclerView;
    private BookRvAdapter bookRvAdapter;
    private List<Book> bookList;
    private List<Book> bookListFull;
    private EditText searchEditText;
    private BookController bookController;
    private BorrowBookController borrowBookController;

    public BorrowBookFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_borrow_book, container, false);

        bookController = new BookController();
        borrowBookController = new BorrowBookController();

        searchEditText = view.findViewById(R.id.searchEditText);
        searchEditText.addTextChangedListener(this);
        recyclerView = view.findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        bookList = new ArrayList<>();
        bookListFull = bookController.getBookList();
        bookList.addAll(bookListFull);
        bookRvAdapter = new BookRvAdapter(bookListFull, bookList, this);
        recyclerView.setAdapter(bookRvAdapter);
        return view;
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {

    }

    @Override
    public void afterTextChanged(Editable s) {
        bookRvAdapter.filter(s.toString());
    }

    public BorrowBookController getBorrowBookController() {
        return borrowBookController;
    }
}
