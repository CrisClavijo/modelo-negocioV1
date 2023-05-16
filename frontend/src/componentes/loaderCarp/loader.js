import './loader.css';

export default function Loader(props){
    return (
        <div>
            <div className='cargando'>
                <div className='absolute w-1/4 top-50 p-3 text-center  left-50 right-50'>
                    <div className='container mx-auto'>
                        <div className="ring"></div>
                        <div className="ring"></div>
                        <div className="ring"></div>
                        <div>Cargando..</div>
                    </div>
                </div>
            </div>
        </div>
)
};
//<span class="loading">Cargando...</span>