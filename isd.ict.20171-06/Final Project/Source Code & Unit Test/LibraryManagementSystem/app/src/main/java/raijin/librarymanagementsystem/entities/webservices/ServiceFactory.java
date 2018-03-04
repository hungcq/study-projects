package raijin.librarymanagementsystem.entities.webservices;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by 1918 on 18-Nov-17.
 */

public class ServiceFactory {
    private Retrofit retrofit;
    private static final String BASE_URL = "https://library-ict.herokuapp.com";
    private static ServiceFactory inst;

    public static ServiceFactory getInst() {
        if (inst == null) {
            inst = new ServiceFactory();
        }
        return inst;
    }

    private ServiceFactory() {
        retrofit = new Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(GsonConverterFactory.create()).build();
    }

    public <ServiceClass> ServiceClass createService(Class<ServiceClass> serviceClass) {
        return retrofit.create(serviceClass);
    }
}
