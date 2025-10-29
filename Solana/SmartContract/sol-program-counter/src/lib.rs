use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{AccountInfo, next_account_info},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

#[derive(BorshDeserialize, BorshSerialize)]
enum InstructionType {
    Increment(u32),
    Decrement(u32),
}

#[derive(BorshSerialize, BorshDeserialize)]
struct Counter {
    count: u32,
}

entrypoint!(counter_contract);

pub fn counter_contract(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let acc = next_account_info(&mut accounts.iter())?; // It Fetched the first Account from the Accounts Array.
    let Instruction_Type = InstructionType::try_from_slice(instruction_data)?;
    match Instruction_Type {
        InstructionType::Increment(val) => {
            msg!("Executing Increase");
            let mut counter_data = Counter::try_from_slice(&mut acc.data.borrow())?.count + val;
            counter_data.serialize(&mut *acc.data.borrow_mut());
        }
        InstructionType::Decrement(val) => {
            msg!("Executing Decrease");
            let mut counter_data = Counter::try_from_slice(&mut acc.data.borrow())?.count - val;
            counter_data.serialize(&mut *acc.data.borrow_mut());
        }
    }
    msg!("Contract Succeded");
    return Ok(());
}
