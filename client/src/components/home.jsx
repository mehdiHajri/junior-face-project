import React, { useState } from 'react'

const Home = ({ signUp, login }) => {
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")


    return (
        <div>
            <section id="showcase"></section>
            <div>
                <div className="wrapper">
                    <div className="card-switch">
                        <label className="switch">
                            <input type="checkbox" className="toggle" />
                            <span className="slider"></span>
                            <span className="card-side"></span>
                            <div className="flip-card__inner">
                                <div className="flip-card__front">
                                    <div className="title">Log in</div>
                                    <form className="flip-card__form" action="">
                                        <input className="flip-card__input" name="email" placeholder="username" type="text" onChange={(e) => { setUserName(e.target.value) }} />
                                        <input className="flip-card__input" name="password" placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                                        <button className="flip-card__btn" onClick={(e) => { e.preventDefault(); login(username, password) }}>Let's go!</button>
                                    </form>
                                </div>
                                <div className="flip-card__back">
                                    <div className="title">Sign up</div>
                                    <form className="flip-card__form" action="">
                                        <input className="flip-card__input" placeholder="Name" type="text" onChange={(e) => { setUserName(e.target.value) }} />
                                        <input className="flip-card__input" name="email" placeholder="Email" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                                        <button className="flip-card__btn" onClick={(e) => { e.preventDefault(); signUp(username, password) }} >Confirm!</button>
                                    </form>
                                </div>
                            </div>
                        </label>
                    </div>

                </div>
            </div>
        </div>


    )
}

export default Home;