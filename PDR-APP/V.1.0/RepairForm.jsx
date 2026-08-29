export default function RepairForm({
    editingRepairId,
    panel,
    setPanel,
    price,
    setPrice,
    description,
    setDescription,
    estimatedRepairTime,
    setEstimatedRepairTime,
    isDisassembly,
    setIsDisassembly,
    disassemblyTime,
    setDisassemblyTime,
    isAluminium,
    setIsAluminium,
    isGlue,
    setIsGlue,
    isEdge,
    setIsEdge,
    isReinforcement,
    setIsReinforcement,
    isHSS,
    setIsHSS,
    isSharp,
    setIsSharp,
    isDeep,
    setIsDeep,
    quantity,
    setQuantity,
    modifiers,
    disassemblyPrice,
    addRepair,
    handleSaveRepair,
    setAddRepairForm
}) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start"
            }}
        >
            {
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start"
                    }}
                >
                    <h2>
                        {editingRepairId != null
                            ? "Edytuj wgniecenia"
                            : "Dodaj wgniecenia"}
                    </h2>
                    <select
                        value={panel}
                        onChange={e => setPanel(e.target.value)}
                    >
                        <option value="" disabled>
                            Wybierz część
                        </option>

                        <optgroup label="Przód">
                            <option value="Maska">Maska</option>
                            <option value="Zderzak przedni">
                                Zderzak przedni
                            </option>
                            <option value="Błotnik lewy przód">
                                Błotnik lewy przód
                            </option>
                            <option value="Błotnik prawy przód">
                                Błotnik prawy przód
                            </option>
                            <option value="Słupek A lewy">Słupek A lewy</option>
                            <option value="Słupek A prawy">
                                Słupek A prawy
                            </option>
                        </optgroup>

                        <optgroup label="Bok">
                            <option value="Drzwi lewe przednie">
                                Drzwi lewe przednie
                            </option>
                            <option value="Drzwi prawe przednie">
                                Drzwi prawe przednie
                            </option>
                            <option value="Drzwi lewe tylne">
                                Drzwi lewe tylne
                            </option>
                            <option value="Drzwi prawe tylne">
                                Drzwi prawe tylne
                            </option>
                            <option value="Próg lewy">Próg lewy</option>
                            <option value="Próg prawy">Próg prawy</option>
                            <option value="Słupek B lewy">Słupek B lewy</option>
                            <option value="Słupek B prawy">
                                Słupek B prawy
                            </option>
                        </optgroup>

                        <optgroup label="Tył">
                            <option value="Klapa bagażnika">
                                Klapa bagażnika
                            </option>
                            <option value="Zderzak tylny">Zderzak tylny</option>
                            <option value="Błotnik lewy tył">
                                Błotnik lewy tył
                            </option>
                            <option value="Błotnik prawy tył">
                                Błotnik prawy tył
                            </option>
                            <option value="Słupek C lewy">Słupek C lewy</option>
                            <option value="Słupek C prawy">
                                Słupek C prawy
                            </option>
                        </optgroup>

                        <optgroup label="Inne">
                            <option value="Dach">Dach</option>
                            <option value="Inne">Inne</option>
                        </optgroup>
                    </select>
                    <select
                        onChange={e => setPrice(e.target.value)}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Wybierz rozmiar
                        </option>
                        <option value="100">0-30mm(S)</option>
                        <option value="200">30-60mm(M)</option>
                        <option value="400">60-100mm(L)</option>
                        <option value="600">100mm+(XL)</option>
                    </select>
                    Cena:
                    <input
                        placeholder="Cena"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    Opis:
                    <textarea
                        style={{ height: "3rem" }}
                        placeholder="Opis:"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    Szacowany czas naprawy: {estimatedRepairTime} h
                    <input
                        style={{ width: "80%" }}
                        type="range"
                        min="0"
                        max="30"
                        step="0.5"
                        value={estimatedRepairTime}
                        onChange={e => setEstimatedRepairTime(e.target.value)}
                    />
                    <p>
                        <input
                            type="checkbox"
                            checked={isDisassembly}
                            onChange={e => setIsDisassembly(e.target.checked)}
                        />
                        Demontaż
                        {isDisassembly && (
                            <input
                                value={disassemblyTime}
                                onChange={e =>
                                    setDisassemblyTime(e.target.value)
                                }
                                placeholder="Czas demontażu w h"
                            />
                        )}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <p>
                            <input
                                type="checkbox"
                                checked={isAluminium}
                                onChange={e => setIsAluminium(e.target.checked)}
                            />
                            <span>Aluminium(25%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isGlue}
                                onChange={e => setIsGlue(e.target.checked)}
                            />
                            <span>Klej(10%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isEdge}
                                onChange={e => setIsEdge(e.target.checked)}
                            />
                            <span>Rant(15%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isReinforcement}
                                onChange={e =>
                                    setIsReinforcement(e.target.checked)
                                }
                            />
                            <span> Wzmocnienie(10%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isHSS}
                                onChange={e => setIsHSS(e.target.checked)}
                            />
                            <span>Twarda blacha(20%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isSharp}
                                onChange={e => setIsSharp(e.target.checked)}
                            />
                            <span> Ostra(10%)</span>
                        </p>
                        <p>
                            <input
                                type="checkbox"
                                checked={isDeep}
                                onChange={e => setIsDeep(e.target.checked)}
                            />
                            <span>Głęboka(15%)</span>
                        </p>
                    </div>
                    <p>Bazowa cena wgniecenia:{price} zł</p>
                    <p>Modyfikatory: {modifiers}%</p>
                    {isDisassembly ? <p>Demontaż:{disassemblyPrice} zł</p> : ""}
                    <p>
                        Aktualna cena wgniecenia:
                        {Number(price) +
                            price * (Number(modifiers) / 100) +
                            (isDisassembly ? disassemblyTime * 50 : 0) *
                                quantity}
                        zł
                    </p>
                    <p> </p>
                    <input
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        placeholder="Ilosć"
                    />
                    <button
                        onClick={
                            editingRepairId === null
                                ? addRepair
                                : handleSaveRepair
                        }
                    >
                        {editingRepairId != null ? "Zapisz" : "Dodaj"}
                    </button>
                    <button onClick={() => setAddRepairForm(false)}>
                        Anuluj
                    </button>
                </div>
            }
        </div>
    );
}
