interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    driver_license: string;
    avatar?: string;
}

export { ICreateUserDTO };
