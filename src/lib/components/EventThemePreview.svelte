<script lang="ts">
  import { user } from '$lib/stores';
  import { FormLabel } from 'carbon-components-svelte';

  export let title: string;
  export let description: string;
  export let link: string;
  export let theme: string;

  let theme_class = '';
  $: theme_class = theme.substring(12, theme.length - 5);
</script>

<FormLabel>Preview</FormLabel>
<div class="theme-preview {theme_class}">
  <h1 class="title">{title}</h1>
  <h2>by {$user.first_name} {$user.last_name}</h2>
  <p>{description}</p>
  <p class="link-text">For more details please visit: <span class="link">{link}</span></p>
  <hr />
  <div class="seats">Available seats: 123</div>
  <div class="signup-form">
    <h3>Signup now</h3>
    <p>Do you have an account with Easy Events? Log in now!</p>
    <h4>Log into existing account</h4>
    <input type="email" class="form-input" placeholder="Your email" />
    <input type="password" class="form-input" placeholder="Your password" />
    <button class="form-button">Login</button>
    <div class="separator">or</div>
    <h4>Create a new account</h4>
    <input type="text" class="form-input" placeholder="Your first name" />
    <input type="text" class="form-input" placeholder="Your last name" />
    <input type="email" class="form-input" placeholder="Your email" />
    <input type="password" class="form-input" placeholder="Your password" />
    <input type="password" class="form-input" placeholder="Repeat password" />
    <button class="form-button">Sign up</button>
  </div>
</div>
<FormLabel>This is just a demo. Styles can vary slightly</FormLabel>

<style>
  .theme-preview {
    border: 2px solid #333;
    padding: 1rem;
    background: var(--background-color);
    color: var(--text-color);
    --text-color: #000;
    --background-color: #fff;
  }
  .theme-preview.dark {
    --background-color: rgb(24 24 27);
    --text-color: #fff;
  }
  .theme-preview.mild {
    --background-color: #fffff5;
    --heading-color: #966933;
  }
  .theme-preview.mild .form-input,
  .theme-preview.mild .form-button {
    border-radius: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--heading-color, var(--text-color));
  }

  h1,
  h2 {
    text-align: center;
  }

  h1 {
    margin-bottom: 0;
  }

  h2 {
    font-size: 1rem;
  }

  .link-text,
  .seats {
    margin: 1rem 0;
  }

  .link {
    color: rgb(8 145 178);
    text-decoration: underline;
    cursor: pointer;
  }
  .link:hover {
    color: rgb(21 94 117);
  }

  .seats {
    font-size: 1.2rem;
  }

  .signup-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.25rem;
  }

  .form-input {
    display: block;
    border-radius: 0.25rem;
    border-width: 1px;
    background-color: #fff;
    border-color: #6b7280;
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  .form-button {
    margin-top: 0.5rem;
    border-radius: 0.25rem;
    border: 2px solid rgb(22 163 74);
    background-color: rgb(22 163 74);
    padding: 0.5rem 1rem;
    color: rgb(255 255 255);
    outline-color: #bbf7d0;
  }
  .form-button:hover {
    outline-style: solid;
  }

  .separator {
    margin: 1.5rem 0 1.25rem;
  }
</style>
