export const errors = {
    LENGTH_ERROR: {
        text: "Username must have at least 6 characters"
    },
    INVALID_CHAR: {
        text: "Username can only consist of alphabets, numbers or underscores"
    }
};

export const validateUsername = (username) => {
    const regex = new RegExp(/[a-z0-9_]{6,20}/);
    console.log(regex.test(username));
}

export const validatePassword = (password) => {
    const regex = new RegExp(/[a-z0-9_]{6,30}/);
    console.log(regex.test(password));
}