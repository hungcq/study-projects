package raijin.studentmanager.webservices;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import raijin.studentmanager.Utils;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by 1918 on 04-May-17.
 */

public class LoginServiceFactory {
    private Retrofit retrofit;
    private static final String BASE_URL = "https://ictk59-api.herokuapp.com";
    private static LoginServiceFactory inst;

    public static LoginServiceFactory getInst() {
        if (inst == null) {
            inst = new LoginServiceFactory();
        }
        return inst;
    }

    private LoginServiceFactory() {
        retrofit = new Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).build();
    }

    public <ServiceClass> ServiceClass createService(Class<ServiceClass> serviceClass) {
        return retrofit.create(serviceClass);
    }
}
