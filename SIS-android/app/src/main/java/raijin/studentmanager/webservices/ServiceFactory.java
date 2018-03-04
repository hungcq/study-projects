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
 * Created by 1918 on 02-May-17.
 */

public class ServiceFactory {
    private Retrofit retrofit;
    private static final String BASE_URL = "https://ictk59-api.herokuapp.com";
    private static ServiceFactory inst;

    public static ServiceFactory getInst() {
        if (inst == null) {
            inst = new ServiceFactory();
        }
        return inst;
    }

    private ServiceFactory() {
        OkHttpClient httpClient = new OkHttpClient().newBuilder().addInterceptor(new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                Request request = chain.request().newBuilder().addHeader("Authorization", Utils.AUTHORIZATION_TOKEN).build();
                return chain.proceed(request);
            }
        }).build();
        retrofit = new Retrofit.Builder().baseUrl(BASE_URL).client(httpClient).addConverterFactory(GsonConverterFactory.create()).build();
    }

    public <ServiceClass> ServiceClass createService(Class<ServiceClass> serviceClass) {
        return retrofit.create(serviceClass);
    }
}
