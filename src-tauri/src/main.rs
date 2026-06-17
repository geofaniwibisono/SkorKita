// Prevent a console/terminal window from appearing on Windows in release builds.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    skorkita_scoreboard_lib::run();
}

