package raijin.librarymanagementsystem.boundaries.fragments;

import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;

import raijin.librarymanagementsystem.R;
import raijin.librarymanagementsystem.boundaries.activities.BaseDrawerActivity;

/**
 * Created by Huy Nguyen on 19-Nov-17.
 */

public class BaseFragment extends Fragment {

    public void showSnackbar(String content) {
        Snackbar.make((getActivity()).findViewById(R.id.coordinator_layout),
                content, Snackbar.LENGTH_SHORT).show();
    }

    protected void openFragment(Fragment fragment) {
        ((BaseDrawerActivity) getActivity()).openFragment(fragment);
    }

    protected void openFragmentAndAddToBackStack(Fragment fragment) {
        ((BaseDrawerActivity) getActivity()).openFragmentAndAddToBackStack(fragment);
    }
}
