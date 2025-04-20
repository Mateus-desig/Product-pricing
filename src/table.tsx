import { useEffect, useState } from "react"

type Item = {
    name: string
    desc: string
    value: number
    valueType: string
    calc: string
    all: boolean
}

type JsonData = {
    fixed: Item[]
    pay: Item[]
}

type TableProps = {
    productVal: string
}

function Table({ productVal }: TableProps) {

    // productVal = "90"

    const [data, setData] = useState<JsonData | null>(null)

    useEffect(() => {
        fetch("public/json/config.json")
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => console.error("Erro ao carregar o JSON:", err))
    }, [])

    const baseValue = parseFloat(productVal || "0")

    function calculateItemValue(base: number, item: Item): number {
        if (item.valueType === "%") {
            return base * (1 - item.value / 100)
        } else if (item.calc === "add") {
            return base + item.value
        } else if (item.calc === "sub") {
            return base - item.value
        } else {
            return base
        }
    }

    function calculateFinalValue(data: JsonData, base: number): number {
        let total = base

        const allItems = [...data.fixed, ...data.pay]

        allItems.forEach(item => {
            if (item.calc === "add") {
                total += item.value
            }
        })

        return total
    }

    const finalValue = data ? calculateFinalValue(data, baseValue) : baseValue

    // Valor fixo para os metodos de pagamento.
    let calcAll = data?.fixed.find(item => item.all)

    return (
        <div className="he-tb">
            <h2 className="title">Cálculos de custo de produto</h2>

            <div className="row header">
                <div className="cell">Tipo</div>
                <div className="cell">Descrição</div>
                <div className="cell amount">Valor</div>
            </div>

            {/* Custos fixos */}
            {data?.fixed.length ? (
                data.fixed.map((item, idx) => {
                    const result = calculateItemValue(baseValue, item)
                    return (
                        <div key={`fixed-${idx}`} className="row">
                            <div className="cell">{item.name}</div>
                            <div className="cell">
                                {item.desc} {item.valueType === "%" || item.calc === "sub" ? "-" : "+"}{" "}
                                {item.valueType !== "%" ? "R$" : ""}{item.value.toFixed(2)}{item.valueType === "%" ? "%" : ""}
                            </div>
                            <div className="cell amount">R$ {result.toFixed(2)}</div>
                        </div>
                    )
                })
            ) : (
                <p>Sem custos fixos.</p>
            )}

            {/* Métodos de pagamento */}
            {data?.pay.length ? (
                data.pay.map((item, idx) => {
                    const result = calculateItemValue(baseValue, item)
                    return (
                        <div key={`pay-${idx}`} className="row">
                            <div className="cell">{item.name}</div>
                            <div className="cell">
                                {item.desc} {item.valueType === "%" || item.calc === "sub" ? "-" : "+"}{" "}
                                {item.valueType !== "%" ? "R$" : ""}{item.value.toFixed(2)}{item.valueType === "%" ? "%" : ""} - {calcAll?.valueType !== "%" ? "R$" : ""}{calcAll?.value}{calcAll?.valueType == "%" ? "%" : ""}
                            </div>
                            <div className="cell amount">
                                R$ {calcAll && calcAll.valueType === "%"
                                    ? (result * (1 - calcAll.value / 100)).toFixed(2)
                                    : result.toFixed(2)}
                            </div>
                        </div>
                    )
                })
            ) : (
                <p>Sem métodos de pagamento fixos.</p>
            )}

            {/* Valor final calculado */}
            <div className="row">
                <div className="cell">Custo Bruto</div>
                <div className="cell">Valor do Produto com tudo incluído</div>
                <div className="cell amount">R$ {finalValue.toFixed(2)}</div>
            </div>

            <div className="price total">
                <div className="cell">Preço sugerido de venda</div>
                <div className="cell"></div>
                <div className="cell amount">R$ {baseValue.toFixed(2)}</div>
            </div>
        </div>
    )
}

export default Table
