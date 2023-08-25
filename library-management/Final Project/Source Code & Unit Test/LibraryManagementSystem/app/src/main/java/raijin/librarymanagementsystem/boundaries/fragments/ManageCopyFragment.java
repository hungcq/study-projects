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
import android.widget.Button;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.List;

import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.boundaries.adapters.CopyRvAdapter;
import raijin.librarymanagementsystem.controllers.CopyController;
import raijin.librarymanagementsystem.entities.Copy;

/**
 * A simple {@link Fragment} subclass.
 */
public class ManageCopyFragment extends BaseFragment implements View.OnClickListener, TextWatcher {


    private RecyclerView recyclerView;
    private CopyRvAdapter copyRvAdapter;
    private List<Copy> copyList;
    private List<Copy> copyListFull;
    private Button addButton;
    private CopyController copyController;
    private EditText searchEditText;

    public ManageCopyFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_manage_copy, container, false);

        copyController = new CopyController();

        addButton = view.findViewById(R.id.addButton);
        addButton.setOnClickListener(this);
        searchEditText = view.findViewById(R.id.searchEditText);
        searchEditText.addTextChangedListener(this);
        recyclerView = view.findViewById(R.id.recyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        copyList = new ArrayList<>();
        copyListFull = copyController.getCopyList();
        copyList.addAll(copyListFull);
        copyRvAdapter = new CopyRvAdapter(copyListFull, copyList);
        recyclerView.setAdapter(copyRvAdapter);
        return view;
    }

    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.addButton:
                openFragmentAndAddToBackStack(new AddCopyFragment());
                break;
        }
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {

    }

    @Override
    public void afterTextChanged(Editable s) {
        copyRvAdapter.filter(s.toString());
    }
}
