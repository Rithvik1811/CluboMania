## Title

### Titles on standby

- Clubomania
- Clubbr

## Pages to work on

- homepage (1 hour)
- club page

- show all clubs (fronted fetch details adn setup backend)
- render events in club page
- render markdown to html
- create new Events
- edit Events
- See Events
- change club info:

## Club Console Features

example URL: https://localhost:3000/club/console

1. create new Events
2. edit Events
3. See Events
4. change club info:
   - name
   - short desc
   - cover image
   - profile image
   - long desc

### 1. create new Events

a button to create blogs which will redirect to edit page
example URL: https://localhost:3000/club/console/events/create

### 2. Edit Events

example URL: https://localhost:3000/club/console/events/event_id/edit

### 3. Preview Events

example URL: https://localhost:3000/club/events

### 4. change club info

example URL: https://localhost:3000/club/console/edit_info

---

## Change font of "club name" in every page mostly to 36px?

---

## MONGODB

### Collections

1.  Clubs

Details of all clubs

```
{
  _id:"abc"
}
```

2.  Events

Details of all events

```
{
  _id:"oiwjofjwifwe",
  clubId: "abc"
}
```

3.  Session IDs

```

```

---

# APIs

## GET

### **Basic Public Club Details**

```
/api/clubs
```

Fetches basic details of all clubs

**Used In**

- clubs page

### **Auxiliary Public Club Details**

```
/api/club/club_username?auxiliary_details=true
```

Fetches the additional details required to display the user when they enter a club page

**Used In**

- club page (induvidual)

### **Fetches the basic details of an event**

```
/api/event/event_id?fields[]=title&fields[]=pic&fields[]=short_body
```

Fetches the:

- title
- pic
- short body

**Used In**

- club page

### **Fetches the body of an event**

```
/api/event/event_id
```

Fetches the:

- title
- pic
- short body

**Used In**

- event page

### **TODO**

### **Fetches the full internal details of the club**

> Requires Auth

```
/auth/login
```

used when the user closes their browser and opens the site again, so the state has to be updated again by authorizing them with their session ID

**Used In**

- club console page
- edit info page

### **Full Public Club Details**

```
/api/club/club_username
```

Fetches the complete details of the club

### **Fetches the event IDs given a club username**

```
/api/events/club_username
```

Fetches the event ids for a given club

```
/api/club/club_username?basic_details=true
```

### **/TODO**

## POST

### **Club Login**

```
/auth/login
```

BODY:

```
{
  "username":String,
  "password":String
}
```

RETURNS:

a sessionID as a cookie

### **Create event**

> Requires Auth

```
/api/create_event/club_username
```

BODY:

```
{
  "title":String,
  "body":String
}
```

RETURNS:

200 | 403

## PUT

### **Edit event**

> Requires Auth

```
/api/edit_event/event_id
```

BODY:

```
{
  "title":String,
  "body":String
}
```

RETURNS:

200 | 403

### **Edit club info**

> Requires Auth

```
/api/club/club_username
```

BODY:

```
{
  .
  .
}
```

RETURNS:

200 - with updated data

OR

403 - with redirect?

## DELETE

### **Delete event**

> Requires Auth

```
/api/event/event_id
```

BODY:

```
{
  .
  .
}
```

RETURNS:

200 - with success message

OR

403 - with redirect?
