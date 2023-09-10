import kotlinx.coroutines.*
import kotlin.concurrent.thread

fun main() = runBlocking { // main thread get blocked until all coroutines finish
    launch {
        suspendFunction1()
        composingFun()
    }
    println("Hello") // main coroutine continues while a previous one is delayed
}

suspend fun suspendFunction1() = coroutineScope {// launch a new coroutine scope. nonblocking, unlike runBlocking
    delay(1000L) // non-blocking delay for 1 second (default time unit is ms)
    println("World!") // print after delay
    val job = launch {
        try {
            delay(1000)
            println("hihi")
        } catch (e: CancellationException) {
            println(e)
        } finally {
            withContext(NonCancellable) {// wrap this if the cleanup involves a suspending function
                delay(1000)
                println("cleaned up")
            }
        }
    }
    delay(500)
    println("wait")
    // cancel the job
    // only work if the suspending function calls inside coroutine is callable (eg default functions)
    // the function will throw CancellationException
    job.cancel()
    job.join() // explicit wait for job completion
    println("finished")
}

fun traditionalThread() {
    thread { Thread.sleep(1000) }
}

suspend fun cancellableComputation() = coroutineScope {
    val startTime = System.currentTimeMillis()
    val job = launch(Dispatchers.Default) {
        var nextPrintTime = startTime
        var i = 0
        while (isActive) { // cancellable computation loop
            // print a message twice a second
            if (System.currentTimeMillis() >= nextPrintTime) {
                println("job: I'm sleeping ${i++} ...")
                nextPrintTime += 500L
            }
        }
    }
    delay(1300L) // delay a bit
    println("main: I'm tired of waiting!")
    job.cancelAndJoin() // cancels the job and waits for its completion
    println("main: Now I can quit.")
}

suspend fun timeoutFunction() = coroutineScope {
    try {
        withTimeout(1000) {// withTimeoutOrNull doesn't throw exception
            delay(2000)
        }
        // should always resource in catch or finally because timeout might happen right before the end of the timeout block
    } catch (e: TimeoutCancellationException) {
        // timeout handling logic here
    }
}

// if an async call throws exception, all other coroutines launched in the scope will be cancelled (throw cancel exception)
suspend fun composingFun() = coroutineScope {
    // call sequentially
    var start = System.currentTimeMillis()
    var res1 = job1()
    var res2 = job2()
    println("run take ${System.currentTimeMillis() - start}. res = ${res1 + res2}")

    // run concurrently with async await
    // async returns a Deferred object (like future value). call await to get the result. call cancel to cancel.
    start = System.currentTimeMillis()
    var f1 = async { job1() }
    var f2 = async { job2() } // only run when await or start method is called
    val res = f1.await() + f2.await()
    println("run take ${System.currentTimeMillis() - start}. res = $res")

    // easier control with lazy start: only start when await or start is called
    f1 = async (start = CoroutineStart.LAZY) { job1() }
    f1.start()
}

suspend fun job1(): Int {
    delay(1000)
    return 1
}

suspend fun job2(): Int {
    delay(1000)
    return 1
}