import mongoose from "mongoose";

const otp_verificationsSchema=mongoose.Schema({
    phone:{
        type:String,
        required:true,
        index:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        default:()=>Date.now()+5*60*1000,   //We purposely created a function so that it it runs every time a document is created.
        index: { expireAfterSeconds: 0 }
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const OTPmodel=mongoose.model("otp_verifications",otp_verificationsSchema)
export default OTPmodel;

/*
OTP Lifecycle

User enters phone
        ↓
OTP generated
        ↓
Stored in DB
        ↓
User enters OTP
        ↓
If correct → delete document
If not used → auto delete after 5 minutes

*/


/*
Later in controller, always:

delete old OTP for same phone before creating new OTP

Otherwise user could have multiple OTPs valid simultaneously.

But this is controller logic, not model.
*/

/*
Great question. This is an **important MongoDB concept** (TTL index). Let’s break it clearly.

---

# 1️⃣ Is `expireAfterSeconds` a Field Name?

❌ No.
`expireAfterSeconds` is **NOT a field stored in the document**.

It is a **MongoDB index configuration option**.

Meaning:

* It tells MongoDB **how to automatically delete documents**
* It is applied to the **index**, not stored as data

So your document in the database will look like this:

```
{
  phone: "9422918612",
  otp: "483921",
  expiresAt: 2026-03-04T18:30:00.000Z,
  isVerified: false
}
```

You **won’t see `expireAfterSeconds` in the document**.

It only exists in the **index metadata**.

---

# 2️⃣ What is a TTL Index?

TTL = **Time To Live**

MongoDB feature that automatically deletes documents after a certain time.

Used for:

* OTP systems
* sessions
* temporary tokens
* logs
* cache data

Example use cases:

```
OTP → delete after 5 minutes
Sessions → delete after 1 hour
Logs → delete after 30 days
```

---

# 3️⃣ Why We Use `expireAfterSeconds: 0`

This is the key idea.

When you write:

```
index: { expireAfterSeconds: 0 }
```

You are telling MongoDB:

> Delete the document **exactly at the time stored in `expiresAt`**

Example document:

```
expiresAt = 6:05 PM
```

MongoDB will delete it **at 6:05 PM**.

---

# 4️⃣ How MongoDB Deletes It

MongoDB runs a background process every ~60 seconds.

It checks:

```
Is expiresAt < current time?
```

If yes:

```
Delete document
```

So OTP disappears automatically.

You **don't need to run delete queries manually**.

---

# 5️⃣ Example Flow

User requests OTP at:

```
6:00 PM
```

Your code sets:

```
expiresAt = 6:05 PM
```

Database record:

```
{
 phone: "9422918612",
 otp: "483921",
 expiresAt: 6:05 PM
}
```

At **6:05 PM**, MongoDB automatically deletes it.

---

# 6️⃣ Why This is Better Than Manual Deletion

Without TTL index you would have to write code like:

```
deleteMany({ expiresAt: { $lt: currentTime } })
```

Problems:

* extra database queries
* slower
* messy code

TTL index solves this automatically.

---

# 7️⃣ Important Note

`expireAfterSeconds` works **only on fields of type `Date`**.

That’s why:

```
expiresAt → Date
```

---

# 8️⃣ Why `expireAfterSeconds` is `0`

Because we already stored **exact expiry time**.

Example:

```
expiresAt = now + 5 minutes
```

So MongoDB should delete **when expiresAt arrives**.

If we used:

```
expireAfterSeconds: 300
```

MongoDB would instead delete **300 seconds after expiresAt**, which is wrong.

---

# 9️⃣ Visual Summary

```
OTP Created → 6:00 PM
        ↓
expiresAt → 6:05 PM
        ↓
MongoDB TTL Index monitors
        ↓
At ~6:05 PM → Document deleted automatically
```

---

# 🔟 Is This Production Practice?

Yes. Very common.

Companies use TTL indexes for:

* OTP
* password reset tokens
* email verification tokens
* login sessions
* refresh tokens

---

# Final Summary

`expireAfterSeconds`:

* is **not a schema field**
* is **an index configuration**
* enables **automatic document deletion**
* keeps your OTP collection clean
* avoids manual cleanup code

---

*/




