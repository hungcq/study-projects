package raijin.librarymanagementsystem.boundaries.adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import com.afollestad.materialdialogs.MaterialDialog;

import java.util.List;

import raijin.librarymanagementsystem.Constants;
import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.boundaries.fragments.BaseFragment;
import raijin.librarymanagementsystem.boundaries.fragments.BorrowBookFragment;
import raijin.librarymanagementsystem.controllers.BookController;
import raijin.librarymanagementsystem.controllers.BorrowBookController;
import raijin.librarymanagementsystem.controllers.CheckResult;
import raijin.librarymanagementsystem.entities.Book;
import raijin.librarymanagementsystem.entities.PostResult;
import raijin.librarymanagementsystem.utils.Utils;

/**
 * Created by 1918 on 15-Nov-17.
 */

public class BookRvAdapter extends RecyclerView.Adapter<BookRvAdapter.MyViewHolder> implements Filterable {

    private List<Book> bookListFull;
    private List<Book> bookList;
    private Context context;
    private BorrowBookController borrowBookController;
    private BaseFragment fragment;

    public BookRvAdapter(List<Book> bookListFull, List<Book> bookList, BaseFragment fragment) {
        this.bookListFull = bookListFull;
        this.bookList = bookList;
        this.fragment = fragment;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_book, parent, false);
        final MyViewHolder myViewHolder = new MyViewHolder(view);
        myViewHolder.detailsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int position = myViewHolder.getAdapterPosition();
                showDetailsDialog(bookList.get(position));
            }
        });
        myViewHolder.borrowButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                int position = myViewHolder.getAdapterPosition();
                String bookNumber = bookList.get(position).getBooknumber();
                sendForm(bookNumber);
            }
        });
        return myViewHolder;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Book book = bookList.get(position);
        holder.textView.setText(book.getTitle());
        if (Utils.role.equals(Constants.LIBRARIAN)) {
            holder.borrowButton.setVisibility(View.GONE);
        }
    }

    @Override
    public int getItemCount() {
        return bookList.size();
    }

    private void sendForm(String bookNumber) {
        borrowBookController = ((BorrowBookFragment) fragment).getBorrowBookController();
        CheckResult checkResult = borrowBookController.ableToBorrow(Utils.username, bookNumber);
        if (!checkResult.isValid()) {
            fragment.showSnackbar(checkResult.getErrorMessage());
        } else {
            PostResult postResult = borrowBookController.borrowBook(Utils.username, bookNumber);
            if (postResult.getStatus() == true) {
                fragment.showSnackbar("Successfully borrowed.");
            } else {
                fragment.showSnackbar(postResult.getError());
            }
        }
    }

    @Override
    public void filter(String text) {
        bookList.clear();
        if (text.isEmpty()) {
            bookList.addAll(bookListFull);
        } else {
            text = text.toLowerCase();
            for (Book book : bookListFull) {
                if (book.getTitle().toLowerCase().contains(text)
                        || book.getBooknumber().toLowerCase().contains(text)) {
                    bookList.add(book);
                }
            }
        }
        notifyDataSetChanged();
    }

    public void showDetailsDialog(Book book) {
        MaterialDialog dialog = new MaterialDialog.Builder(context)
                .title(book.getBooknumber())
                .customView(R.layout.dialog_book_details, true)
                .positiveText("Close")
                .build();
        TextView bookNumber = (TextView) dialog.findViewById(R.id.bookNumberTextView);
        TextView title = (TextView) dialog.findViewById(R.id.titleTextView);
        TextView author = (TextView) dialog.findViewById(R.id.authorTextView);
        TextView publisher = (TextView) dialog.findViewById(R.id.publisherTextView);
        TextView isbn = (TextView) dialog.findViewById(R.id.isbnTextView);
        TextView classification = (TextView) dialog.findViewById(R.id.classificationTextView);
        bookNumber.setText(book.getBooknumber());
        title.setText(book.getTitle());
        author.setText(book.getAuthor());
        publisher.setText(book.getPublisher());
        isbn.setText(book.getIsbn());
        classification.setText(book.getClassification());
        dialog.show();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        TextView textView;
        Button detailsButton;
        Button borrowButton;

        public MyViewHolder(View itemView) {
            super(itemView);
            textView = itemView.findViewById(R.id.textView);
            detailsButton = itemView.findViewById(R.id.detailsButton);
            borrowButton = itemView.findViewById(R.id.borrowButton);
        }
    }
}
