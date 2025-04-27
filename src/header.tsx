import React, { useState } from 'react'

type HeaderProps = {
    productVal: string
    onChange: (val: string) => void
}

function Header({ onChange }: HeaderProps) {
    const [productionPrice, setProductionPrice] = useState<string>("")
    const [profitPercentage, setProfitPercentage] = useState<string>("")

    const handleProductionInput = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value

        if (/^\d*\.?\d*$/.test(val) || val === "") {
            setProductionPrice(val)
            setProfitPercentage("")
            onChange("") // limpa o valor final até colocar a porcentagem.
        }
        
    }

    const handleProfitInput = (e: React.FormEvent<HTMLInputElement>) => {
        const val = e.currentTarget.value

        if (/^\d*\.?\d*$/.test(val) || val === "") {
            setProfitPercentage(val)

            if (productionPrice && val !== "") {
                const base = parseFloat(productionPrice)
                const profit = parseFloat(val)
                const final = base + (base * profit / 100)
                onChange(final.toFixed(2))
            } else {
                onChange("")
            }
        }
    }

    return (
        <div className="he-ct">
            <div className="inputs">

                <div>
                    <div className="title-he">Preço do produto</div>
                    <div className="ct-ip">
                        <div className="type">R$</div>
                        <input
                            className="pdt-vl"
                            type="text"
                            onInput={handleProductionInput}
                            value={productionPrice}
                            placeholder="Preço de produção do produto"
                        />
                    </div>
                </div>

                <div>
                    <div className="title-he">Porcentagem de lucro</div>
                    <div className="ct-ip">
                        <div className="type">%</div>
                        <input
                            className="pdt-pc"
                            type="text"
                            onInput={handleProfitInput}
                            value={profitPercentage}
                            placeholder="Porcentagem de lucro"
                        />
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Header
