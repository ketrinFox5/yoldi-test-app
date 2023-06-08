const FormWrapper = (props: any) => {
    
    return <div className="form-wrapper">
        <div className="form-wrapper__block">
            {props.children}
        </div>
    </div>
}

export default FormWrapper;