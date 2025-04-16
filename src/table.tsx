
function Table() {

    return (
        <div className="he-tb">
            <h2 className="title">Calculos de custo de produto</h2>

            <div className="row header">
                <div className="cell">Tipo</div>
                <div className="cell">Descrição</div>
                <div className="cell amount">Valor</div>
            </div>

            <div className="row">
                <div className="cell">Raw Material</div>
                <div className="cell">Cotton Thread</div>
                <div className="cell amount">R$ 25.00</div>
            </div>

            <div className="row">
                <div className="cell">Labor</div>
                <div className="cell">Seamstress</div>
                <div className="cell amount">R$ 30.00</div>
            </div>

            <div className="row">
                <div className="cell">Transport</div>
                <div className="cell">Delivery</div>
                <div className="cell amount">R$ 10.00</div>
            </div>

            <div className="row">
                <div className="cell">Raw Material</div>
                <div className="cell">Cotton Thread</div>
                <div className="cell amount">R$ 25.00</div>
            </div>

            <div className="row">
                <div className="cell">Labor</div>
                <div className="cell">Seamstress</div>
                <div className="cell amount">R$ 30.00</div>
            </div>

            <div className="row last">
                <div className="cell">Transport</div>
                <div className="cell">Delivery</div>
                <div className="cell amount">R$ 10.00</div>
            </div>

            <div className="price total">
                <div className="cell">Preço sugerido de venda</div>
                <div className="cell"></div>
                <div className="cell amount">R$ 65.00</div>
            </div>
        </div>
    )

}


export default Table