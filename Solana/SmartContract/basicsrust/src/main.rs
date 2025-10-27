// Numbers

// fn main(){
//     let sum = Sum(1,2);
//     print!("{}",sum);
//     println!("Hello World") // marcro
// }
// fn Sum(a:u32,b:u32) -> u32{
//     return a+b;
// }

// Strings

// fn main(){
//  let name = String::from("Aditya");
//  print!("{}",name);
// }

// Vectors

// fn main(){
// let v:Vec<i32> = vec![1,2,3];
// print!("{:?}",v);
// }

use chrono::prelude::*;
use std::fmt::Display;
use std::ops::Mul;
/// Loops

// fn main(){
//  for i in 0..100{
//     print!("{}",i);
//  }
// }

// Mutablity

// fn main(){
//  let mut x = 1;
//  x = 2;
//  print!("{}",x);
// }

// Dangling Pointer -> ( A Value can have only one owener)
// fn main(){

//  let name1 = String::from("Aditya");
//  let name2 = name1;
//     // print!("{}",name1;  -> This will not work because it has some Borrowing issue, the onwer of the String::("Aditya") is now name2
//     print!("{}",name2);
// }

/// Changing the Ownership of the variables
// fn main(){
//  let name1 = String::from("Aditya");
// let getlen = getlen(name1);
// print!("{}",getlen);
// // print!(name1); -> Will not work here because the ownership of the varible has been moved to the getLen() function.
// }

// fn getlen(s:String) -> usize{
//     return s.len();
// }

// Borrowing Referencing Rules

// 1) We can have only one mutable reference and reborrowing is not allowed
// 2) We can have Multiple Immuatable reference

// fn main() {
//     let mut s1 = String::from("Aditya");
//     let s2 = &mut s1;
//     let s3 = &s1; /* This will not work as one mutable reference is already been created */
//     s2.push_str("Gupta");
// }

// fn borrowExample(){
//     let s1 = String::from("Aditya");
//     let s2 = &s1;
//     let s3 = &s1;
//     print!("{},{}",s2,s3);   /* This will work because we can have multiple immutable refrences */
// }

// fn specialBorrowExample(){
//     let mut s1 = String::from("Aditya");
//     let s2 = &mut s1;
//     s2.push_str("Gupta");

//     /** S2 lifespan ends here */
//     let s3 = &s1; /*This will work because the mutable reference LifeCycle has been ended  */
// }

// Struct and Implementation
// pub mod rect; // Importing the module rect.
// use rect::Rect; // Importing the Rect Strut from the rect module.

// fn main() {
//     let rectangle = Rect {
//         height: 10,
//         width: 20,
//     };
//     let rectangle_area = rectangle.area();
//     Rect::print_something();
//     println!("{}", rectangle_area);
//     println!("{:?}", rectangle);
// }

// Enums in rust

// enum Direction {
//     North,
//     South,
//     East,
//     West,
// }

// fn main() {
//     let direction = Direction::North;
//     steer(direction);
// }

// fn steer(dir: Direction) {
//     match dir {
//         Direction::East => print!("East Directions"),
//         Direction::North => print!("North Direction"),
//         Direction::South => print!("South Direction"),
//         Direction::West => print!("West Direction"),
//     }
// }
use std::process::Output;
// Exercise on Enum
use std::usize;
enum Shape {
    Rectangle(u32, u32),
    Square(u32),
    Circle(u32),
}

fn main() {
    let Shape1 = Shape::Circle(10);
    let Shape2 = Shape::Rectangle(10, 20);
    let Shape3 = Shape::Square(20);

    let utc = Utc::now();
    println!("{}", utc);

    let name = "aditya";
    let first_index_a = find_first_index(name);

    match first_index_a {
        Some(val) => print!("first index of a is{}", val),
        None => print!("A not found"),
    }

    /** Use the Trait */
    print_details(1123, 2122);
}

fn CalculateArea(shape: Shape) -> u32 {
    match shape {
        Shape::Circle(radius) => return 2 * radius,
        _ => return 10,
    }
}

// Example of a Option Enum

fn find_first_index(s: &str) -> Option<usize> {
    for (i, c) in s.chars().enumerate() {
        if c == 'a' {
            return Some(i);
        }
    }
    None
}

/// Generics Traits and Bound

fn print_details<T: Display>(a: T, b: T) {
    /// We can only call the function with the arguments which uses Display trait.
    println!("{}", a);
    println!("{}", b);
}

// Structs with Generics

#[derive(Clone, Copy)]
struct Rect<T> {
    height: T,
    width: T,
}

impl<T: Mul<Output = T> + Copy> shape<T> for Rect<T> {
    fn area(&self) -> T {
        return (self.height) * (self.width);
    }
}

// traits in rust (Just like interfaces in Typescript)

trait shape<T> {
    fn area(&self) -> T;
}
