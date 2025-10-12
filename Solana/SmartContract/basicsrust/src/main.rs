
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

fn main(){
 
 let name1 = String::from("Aditya");
let getlen = getlen(name1);
print!("{}",getlen);
// print!(name1); -> Will not work here because the ownership of the varible has been moved to the getLen() function.
}

fn getlen(s:String) -> usize{
    return s.len();
}






