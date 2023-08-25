package raijin.librarymanagementsystem.boundaries.adapters;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;

import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.controllers.BookController;
import raijin.librarymanagementsystem.entities.Book;
import raijin.librarymanagementsystem.entities.Copy;

/**
 * Created by 1918 on 18-Nov-17.
 */

public class CopyRvAdapter extends RecyclerView.Adapter<CopyRvAdapter.MyViewHolder> implements Filterable {

    private List<Copy> copyListFull;
    private List<Copy> copyList;
    private Context context;
    private BookController bookController;

    public CopyRvAdapter(List<Copy> copyListFull, List<Copy> copyList) {
        this.copyListFull = copyListFull;
        this.copyList = copyList;
        bookController = new BookController();
        bookController.refreshBookList();
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        context = parent.getContext();
        View view = LayoutInflater.from(context).inflate(R.layout.row_copy,parent,false);
        MyViewHolder myViewHolder = new MyViewHolder(view);
        return myViewHolder;
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        Copy copy = copyList.get(position);
        Book book = bookController.getBookByBookNumber(copy.getBooknumber());
        if(book != null) {
            holder.textView.setText(book.getTitle());
        }
        holder.copyNumberTextView.setText(copy.getCopynumber());
    }

    @Override
    public int getItemCount() {
        return copyList.size();
    }

    @Override
    public void filter(String text) {
        copyList.clear();
        if (text.isEmpty()) {
            copyList.addAll(copyListFull);
        } else {
            text = text.toLowerCase();
            for (Copy copy : copyListFull) {
                Book book = bookController.getBookByBookNumber(copy.getBooknumber());
                if (book != null) {
                    if (copy.getCopynumber().toLowerCase().contains(text)
                            || book.getTitle().toLowerCase().contains(text)) {
                        copyList.add(copy);
                    }
                } else {
                    if (copy.getCopynumber().toLowerCase().contains(text)) {
                        copyList.add(copy);
                    }
                }
            }
        }
        notifyDataSetChanged();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        TextView textView;
        TextView copyNumberTextView;

        public MyViewHolder(View itemView) {
            super(itemView);
            textView = itemView.findViewById(R.id.textView);
            copyNumberTextView = itemView.findViewById(R.id.copyNumberTextView);
        }
    }
}
