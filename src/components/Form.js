const Form = ({ handleChange, handleSubmit, children, showDefault=true }) => {
    return (
        <form className="auth-container__form" onSubmit={handleSubmit}>
            { showDefault
                ? <>
                    {children}
                    
                    <label htmlFor="email">Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="youremail@domain.com"
                        onChange={handleChange}
                    />

                    <label htmlFor="password">Contraseña</label>
                    <input
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder="******"
                        onChange={handleChange}
                    />
                </>
                : <>{children}</> 
            }
        </form>
    );
};

export default Form;
