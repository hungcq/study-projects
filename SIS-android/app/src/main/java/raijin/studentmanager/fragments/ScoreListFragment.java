package raijin.studentmanager.fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.DividerItemDecoration;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.pnikosis.materialishprogress.ProgressWheel;

import java.util.ArrayList;
import java.util.List;

import raijin.studentmanager.Constants;
import raijin.studentmanager.R;
import raijin.studentmanager.adapters.ScoreRvAdapter;
import raijin.studentmanager.interfaces.Searchable;
import raijin.studentmanager.models.score.Score;
import raijin.studentmanager.models.score.ScoreModel;
import raijin.studentmanager.webservices.ScoreAPI;
import raijin.studentmanager.webservices.ServiceFactory;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * A simple {@link Fragment} subclass.
 */
public class ScoreListFragment extends Fragment implements Searchable {

    private RecyclerView recyclerView;
    private ProgressWheel progressWheel;
    private ScoreRvAdapter adapter;
    private List<Score> scoreList;
    private List<Score> scoreListFull;

    public ScoreListFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_info, container, false);
        getActivity().setTitle(R.string.score_list);
        progressWheel = (ProgressWheel) view.findViewById(R.id.progress_wheel);
        progressWheel.spin();
        recyclerView = (RecyclerView) view.findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        RecyclerView.ItemDecoration itemDecoration = new DividerItemDecoration(getContext(), DividerItemDecoration.VERTICAL);
        recyclerView.addItemDecoration(itemDecoration);
        scoreList = new ArrayList<>();
        scoreListFull = new ArrayList<>();
        adapter = new ScoreRvAdapter(scoreList, scoreListFull);
        recyclerView.setAdapter(adapter);
        loadData();
        return view;
    }

    private void loadData() {
        ServiceFactory.getInst().createService(ScoreAPI.class).getScores(Constants.JSON_FORMAT, Constants.MAX_ITEM, 0)
                .enqueue(new Callback<ScoreModel>() {
                    @Override
                    public void onResponse(Call<ScoreModel> call, Response<ScoreModel> response) {
                        if (response.isSuccessful()) {
                            for (Score score : response.body().getResults()) {
                                scoreList.add(score);
                                scoreListFull.add(score);
                            }
                            adapter.notifyDataSetChanged();
                            progressWheel.stopSpinning();
                        }
                    }

                    @Override
                    public void onFailure(Call<ScoreModel> call, Throwable t) {

                    }
                });
    }

    @Override
    public void doSearch(String text) {
        adapter.filter(text);
    }
}
