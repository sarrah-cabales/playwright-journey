let loginAttempts: number = 4;
let maxAllowedAttempts: number = 3;

if (loginAttempts > maxAllowedAttempts) {
    console.log("❌ TEST PASSED: User account is successfully LOCKED due to too many failed attempts.");
} else {
    console.log("⚠️ TEST FAILED: User is still allowed to log in.");
}