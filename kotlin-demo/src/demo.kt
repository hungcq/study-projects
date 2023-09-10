import kotlin.properties.Delegates

val xGlobal = 1 // top level val
var yGlobal = 2

fun main() {
    // vars
    val x = 1 // automatic type inference
    val xLong = x.toLong() // type conversion
    var y: Long = 2 // explicit type declaration

    // string
    var s = "hihi"
    println(s.startsWith("hi"))
    println(s.contains("ih"))
    println("hello".uppercase())
    var c = s[0]

    // collections
    var list = listOf<Int>() // immutable list. setOf: immutable set ~
    println(list)
    // set func: count, add, remove, contains
    // mutable list implementation: java arraylist
    // func [index], first, last, add, remove(x) (remove first x)
    var mutableList = mutableListOf<Int>() // mutableSetOf ~
    mutableList.add(3)
    for (e in mutableList) {
        println(e)
    }
    println(mutableList.count())
    println(2 in list) // check whether 2 in list/set
    val immutableList: List<Int> = mutableList // casting
    // map
    val mutableMap: MutableMap<Int, String> = mutableMapOf(1 to "a", 2 to "b") // mutable map ~
    val map: Map<Int, String> = mutableMap
    mutableMap[3] = "c"
    mutableMap.remove(3)
    println(mutableMap)
    for (k in map.keys) { // ~map.values, map.entries
        println("$k ${map[k]}")
    }
    println(3 in map.keys)

    // control flow
    println("hihi ${if (x < y) "a" else "b"}")
    if (x < y) {
        println("x < y")
    }
    // when: ~switch. check sequentially, stop at first match
    when (x) {
        1 -> println("1")
        2 -> println("2")
        else -> println("not sure")
    }
    // when as expression
    var z = when (x) {
        1 -> 2
        2 -> 3
        else -> 4
    }
    // when instead of if
    when {
        x < 0 -> println("< 0")
        x < 3 -> println("< 3")
    }
    // range
    var rangeTest = x..y step 1
    println(rangeTest)
    'a'..'d' step 2
    // for
    for (e in rangeTest) {
        println(e)
    }
    // while: ~normal while
    repeat(2) {
        println(it)
    }

    // function
    println(sum(a = 1, b = 2)) // named params
    println(sum(1, 2))
    println(sum(b = 2)) // skip default param
    // lambda
    println({ a: Int, b: Int -> a + b }(1, 2))
    val printMes = { println("message") } // assign to var. lambda without param: no ->
    printMes()
    // lambda as param. trailing lambda: can remove () in filter call
    println(listOf(1, 2, 3).filter { e -> e % 2 == 0 })
    val mapFun: (Int) -> Int = { a: Int ->
        println(a)
        a * 2
    } // lambda with function type
    val mapFun2 = fun(a: Int): Int {
        println(a)
        return a * 2
    }
    println(listOf(1, 2, 3).map(mapFun2))
    // fold: apply operation to e & arr[0] -> arr[n]
    println(listOf(1, 2, 4).fold(2) { e, item -> e * item })  // trailing lambda: pass outside ()

    // null safety
    var name = "abc" // cant be set to null
    var nameNullable: String? = null
    println(nameNullable == null)
    println(nameNullable?.length) // check for null before access property. return null if object is null
    println(nameNullable?.uppercase()) // return null
    println(nameNullable?.length ?: 0) // elvis operator: if null then return 0

    // class
    classExp()
}

// inline func
fun min(a: Int, b: Int) = if (a < b) a else b

// empty return type: omit or use Unit
fun sum(a: Int = 1, b: Int): Int { // default value
    return a + b
}

// lambda as return type
fun cal(operation: String): (Int, Int) -> Int = when (operation) {
    "x" -> { a, b -> a * b }
    "+" -> { a, b -> a + b }
    else -> mapFun3
}

val mapFun3 = fun(a: Int, b: Int): Int {
    println(a)
    return a * 2
}

// class
open class Employee(val id: Int = 1, name: String) { // name is private param. usage see name2 below.
    var postcode: String by Delegates.observable("") { prop, oldVal: String, newVal: String ->
        println(newVal)
        println(oldVal)
    }
    var name2: String = ""
        get() { // custom getter: called everytime the property is accessed
            if (field == "") {
                field = "hihi"
            }
            println(id)
            return field
        }
        set(value) { // setter
            field = value.uppercase()
        }

    constructor(id: Int, name: String, postcode: String) : this(id, name) { // secondary constructor
        this.postcode = postcode
    }

    fun printId() { // method
        println("id is $id")
    }
}

class CustomEmployee() : Employee(1, "") // inheritance

// data class
data class User(val id: Int, val name: String)

fun classExp() {
    var employee = Employee(1, "hung") // init with default constructor
    employee.postcode = "abc"
    employee.printId()
    println(employee.name2)
    println(employee.toString())

    var user = User(2, "hihi")
    // data class functions
    println(user)
    var user2 = User(2, "hihi")
    println(user == user2)
    var userClone = user.copy() // can be used for immutability
    var userCloneWithModification = user.copy(id = 3)
}