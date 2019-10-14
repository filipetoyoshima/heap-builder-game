import LineTo from 'react-lineto'

export default function() {
    return (
        <>
            <div
                className='A'
                style={{
                    background: 'blue',
                    width: 100,
                    height: 100,
                    top: '10px',
                    left: '10px',
                    position: 'absolute'
                }}
            />
            <div
                className='B'
                style={{
                    background: 'yellow',
                    width: 100,
                    height: 100,
                    top: '130px',
                    left: '130px',
                    position: 'absolute'
                }}
            />
            <LineTo
                from='A'
                to='B'
                borderStyle='solid'
                borderWidth={2}
                borderColor='black'
            />
            <Line x0={0} y0={0} x1={1030} y1={1030} />
        </>
    )
};