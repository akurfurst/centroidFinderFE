

export default function ProcessButton({handleClick}){
    //const nav = useNavigate();
    
    // useEffect(() => {
    //     if(data && data.jobId){
    //         nav(`/process/${data.jobId}`);
    //     }
    // }, [data, nav]);

    return(
        <div className="process-button">
            <button onClick={() => handleClick()}>Process Video</button>
        </div>
    );
}