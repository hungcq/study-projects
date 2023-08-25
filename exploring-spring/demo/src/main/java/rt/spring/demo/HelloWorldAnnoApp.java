package rt.spring.demo;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class HelloWorldAnnoApp {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext();
        ctx.register(HelloWorldConfig.class);
        ctx.refresh();

        HelloWorld helloWorld = ctx.getBean(HelloWorld.class);
        helloWorld.setMessage1("Hello World!");
        helloWorld.getMessage1();
    }
}
