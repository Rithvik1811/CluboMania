# Other

- Apply .lean() to all GET Requests

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

### **Get events from club username**

```
/api/events/club_username
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
/api/event/event_id?fields[]=body
```

Fetches the:

- body

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
/api/create_event
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

**Known Errors**

shows deleted: true even for the events that don't exist.

basically there's no error checking to check if event ID exists or not before deleting
