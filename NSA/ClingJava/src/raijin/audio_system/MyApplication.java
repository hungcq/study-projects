package raijin.audio_system;

import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.stage.WindowEvent;
import raijin.audio_system.controllers.Controller;
import raijin.audio_system.controllers.ControllerInterface;
import raijin.audio_system.views.View;

public class MyApplication extends Application{
    View view;

    @Override
    public void start(Stage primaryStage) throws Exception{
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/view.fxml"));
        Parent root = fxmlLoader.load();

        // controller instance to init model attribute
        view = fxmlLoader.<View>getController();
        ControllerInterface controller = new Controller(view);
        view.setController(controller);

        primaryStage.setTitle("Audio System");
        primaryStage.setScene(new Scene(root, 600, 400));
        primaryStage.setResizable(false);
        primaryStage.show();
        primaryStage.setOnCloseRequest(new EventHandler<WindowEvent>() {
            @Override
            public void handle(WindowEvent event) {
                System.exit(0);
            }
        });
    }


    public static void main(String[] args) {
        launch(args);
    }
}
