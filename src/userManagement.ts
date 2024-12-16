

namespace UserManagement {
    export namespace Admin {
        export class AdminUser {
            private readonly name: string;
            private readonly email: string;
            private isSuperAdmin: boolean;

            constructor(name: string, email: string, isSuperAdmin: boolean) {
                this.name = name;
                this.email = email;
                this.isSuperAdmin = isSuperAdmin;
            }

            public toggleSuperAdminStatus() {
                this.isSuperAdmin = !this.isSuperAdmin;
                console.log(`Super admin status for ${this.name} is now ${this.isSuperAdmin}`);
            }
        }
    }
}

export default UserManagement;