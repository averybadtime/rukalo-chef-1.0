<template>
	<div id="sign-in-dialog" class="zoom-anim-dialog mfp-hide">
		<div class="small-dialog-header">
			<h3>Autenticación</h3>
		</div>
		<!--Tabs -->
		<div class="sign-in-form style-1">
			<ul class="tabs-nav">
				<li class=""><a href="#tab1">Ingresar</a></li>
				<li><a href="#tab2">Registrarse</a></li>
			</ul>
			<div class="tabs-container alt">
				<!-- Login -->
				<div class="tab-content" id="tab1" style="display: none;">
					<form @submit.prevent="logIn" class="login">
						<p class="form-row form-row-wide">
							<label for="email">Usuario:
								<i class="im im-icon-Male"></i>
								<input type="text" class="input-text" name="lEmail" id="lEmail" v-model="l.email"/>
							</label>
						</p>
						<p class="form-row form-row-wide">
							<label for="password">Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="lPassword" id="lPassword" v-model="l.password"/>
							</label>
							<span class="lost_password">
								<a href="#" >¿Has olvidado tu contraseña?</a>
							</span>
						</p>
						<div class="form-row">
							<input type="submit" class="button border margin-top-5" name="login" value="Ingresar" />
						</div>
					</form>
				</div>

				<!-- Register -->
				<div class="tab-content" id="tab2" style="display: none;">
					<form @submit.prevent="register" class="register">
						<p class="form-row form-row-wide">
							<label for="username2">Usuario:
								<i class="im im-icon-Male"></i>
								<input type="text" class="input-text" name="rUsername" id="rUsername" v-model="r.username"/>
							</label>
						</p>
						
						<p class="form-row form-row-wide">
							<label for="email2">Email:
								<i class="im im-icon-Mail"></i>
								<input type="text" class="input-text" name="rEmail" id="rEmail" v-model="r.email"/>
							</label>
						</p>
		
						<p class="form-row form-row-wide">
							<label for="password1">Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="rPassword" id="rPassword" v-model="r.password"/>
							</label>
						</p>
		
						<p class="form-row form-row-wide">
							<label for="password2">Repetir Contraseña:
								<i class="im im-icon-Lock-2"></i>
								<input class="input-text" type="password" name="rConfirmPassword" id="rConfirmPassword" v-model="r.confirmPassword"/>
							</label>
						</p>
						<input type="submit" class="button border fw margin-top-10" name="register" value="Registrarse"/>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import hasEmptyFields from "@/mixins/hasEmptyFields"
	import { AUTH, DB } from "@/firebase"
	export default {
		mixins: [hasEmptyFields],
		data() {
			return {
				l: {
					email: "",
					password: ""
				},
				r: {
					username: "",
					email: "",
					password: "",
					confirmPassword: ""
				}
			}
		},
		methods: {
			isUser(email) {
				return new Promise(resolve => {
					const userRef = DB.ref("/users/users/")
					userRef.orderByChild("profileInfo/email").equalTo(email).once("value", snapshot => {
						return resolve(snapshot.exists())
					})
				})
			},
			usernameExists(username) {
				return new Promise(resolve => {
					const registeredUsernamesRef = DB.ref("/registeredUsernames/" + username)
					registeredUsernamesRef.once("value")
					.then(snapshot => resolve(snapshot.exists()))
				})
			},
			logIn() {
				if (this.hasEmptyFields(this.l)) {
					const message = "No has rellenado todos los campos."
					console.error(message)
					alert(message)
					return
				}
				const email = this.l.email
				const password = this.l.password
				this.isUser(email).then(isUser => {
					if (isUser) {
						AUTH.signInWithEmailAndPassword(email, password).then(() => console.log("logueado"))
						.catch(err => console.error(err))
					} else {
						const message = "Este usuario no se encuentra registrado."
						console.error(message)
						alert(message)
					}
				})
			},
			register() {
				// Empty fields
				if (this.hasEmptyFields(this.r)) {
					const message = "No has rellenado todos los campos."
					console.error(message)
					alert(message)
					return
				}
				// Password and confirmation don't match
				if (this.r.password !== this.r.confirmPassword) {
					const message = "Las contraseñas no coindicen, verifícalas e intenta de nuevo."
					console.error(message)
					alert(message)
					return
				}

				const username = this.r.username
				const email = this.r.email
				const password = this.r.password
				const confirmPassword = this.r.confirmPassword
				
				this.usernameExists(username).then(usernameExists => {
					if (usernameExists) {
						const message = "El nombre de usuario no se encuentra disponible."
						console.error(message)
						alert(message)
					} else {
						AUTH.createUserWithEmailAndPassword(this.r.email, this.r.password).then(resp => {
							const uid = resp.user.uid
							let updatedInfo = {}
							updatedInfo["/users/users/" + uid + "/profileInfo"] = { username, email, role: "USER" }
							updatedInfo["/registeredUsernames/" + username] = true
							DB.ref().update(updatedInfo, err => {
								if (err) console.error("Error guardando al usuario en la base de datos: " + err)
								else alert("Usuario creado con éxito.")
							})
						}).catch(err => console.error(err))
					}
				}).catch(err => console.error("Error en la validación de existencia del usuario."))
			}
		}
	}
</script>