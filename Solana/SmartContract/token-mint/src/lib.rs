use std::fmt::Error;

use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};
use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshDeserialize, BorshSerialize)]
enum InstructionType {
    Signup(user_account),
    Transfer(user_account),
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct user_account{
    pub authority:Pubkey,
    pub name:String
}


entrypoint!(token_mint);

pub fn token_mint(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let acc = next_account_info(&mut accounts.iter())?; // It Fetched the first Account from the Accounts Array.
    
    return Ok(());
}

pub fn Signup(user: user_account)->Result<(),Error>{
    return Ok(());
}

pub fn Transfer(user:user_account)->Result<(),Error>{
    return Ok(());
}





