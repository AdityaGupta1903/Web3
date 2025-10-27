#[derive(Debug)]
pub struct Rect {
    pub height: u32,
    pub width: u32,
}

impl Rect {
    pub fn area(&self) -> u32 {
        /** This is Dyanmic method as it requires the Object's Instance */
        return self.height * self.width;
    }
    pub fn print_something() {
        /** This is a static method */
        print!("Test Text");
    }
}
